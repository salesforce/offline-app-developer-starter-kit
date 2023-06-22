import { LightningElement } from "lwc";

export default class FileUpload extends LightningElement {
  @track
  files = undefined;

  @track
  uploadingFile = false;

  @track
  titleValue = "";

  @track
  descriptionValue = "";

  @track
  errorMessage = "";

  get fileName() {
    const file = this.files && this.files[0];
    if (file) {
      return file.name;
    }
    return undefined;
  }

  handleInputChange(event) {
    this.files = event.detail.files;
    this.titleValue = this.fileName;
  }

  handleTitleInputChange(event) {
    this.titleValue = event.detail.value;
  }

  handleDescriptionInputChange(event) {
    this.descriptionValue = event.detail.value;
  }

  resetInputs() {
    this.files = [];
    this.titleValue = "";
    this.descriptionValue = "";
    this.errorMessage = "";
  }

  // Handle the user uploading a file
  async handleUploadClick() {
    if (this.uploadingFile) {
      return;
    }

    const file = this.files && this.files[0];
    if (!file) {
      return;
    }

    try {
      this.uploadingFile = true;

      // Create a ContentDocumentLink (CDL) to associate the uploaded file
      // to the Files Related List of a record, like a Work Order.
      const contentDocumentAndVersion =
        await unstable_createContentDocumentAndVersion({
          title: this.titleValue,
          description: this.descriptionValue,
          fileData: file,
        });

      if (this.recordId) {
        const contentDocumentId = contentDocumentAndVersion.contentDocument.id;
        await this.createCdl(this.recordId, contentDocumentId);
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = error;
    } finally {
      this.resetInputs();
      this.uploadingFile = false;
    }
  }

  async createCdl(recordId, contentDocumentId) {
    await createRecord({
      apiName: "ContentDocumentLink",
      fields: {
        LinkedEntityId: recordId,
        ContentDocumentId: contentDocumentId,
        ShareType: "V",
      },
    })
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "File attached",
            variant: "success",
          })
        );
      })
      .catch((e) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error uploading file",
            message: e.body.message,
            variant: "error",
          })
        );
      });
  }
}