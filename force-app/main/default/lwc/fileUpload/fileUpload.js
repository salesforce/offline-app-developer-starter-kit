import { LightningElement, api, track } from "lwc";
import {
  unstable_createContentDocumentAndVersion,
  createRecord,
} from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class FileUpload extends LightningElement {
  @api
  recordId;

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

  // This getter is only used for local processing. It does not need to be enabled for offline caching.
  // eslint-disable @salesforce/lwc-graph-analyzer/no-getter-contains-more-than-return-statement
  get fileName() {
    const file = this.files && this.files[0];
    if (file) {
      return file.name;
    }
    return undefined;
  }
  // eslint-enable @salesforce/lwc-graph-analyzer/no-getter-contains-more-than-return-statement

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

  // Restore the UI to its default state to allow uploading
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

      // Create a Content Document and Version for the file
      // effectively uploading it
      const contentDocumentAndVersion =
        await unstable_createContentDocumentAndVersion({
          title: this.titleValue,
          description: this.descriptionValue,
          fileData: file,
        });

      if (this.recordId) {
        const contentDocumentId = contentDocumentAndVersion.contentDocument.id;

        // Create a ContentDocumentLink (CDL) to associate the uploaded file
        // to the Files Related List of the target recordId
        await this.createCdl(this.recordId, contentDocumentId);
      }
      this.resetInputs();
    } catch (error) {
      console.error(error);
      this.errorMessage = error;
    } finally {
      this.uploadingFile = false;
    }
  }

  // Create the link between the new file upload and the target record
  async createCdl(recordId, contentDocumentId) {
    await createRecord({
      apiName: "ContentDocumentLink",
      fields: {
        LinkedEntityId: recordId,
        ContentDocumentId: contentDocumentId,
        ShareType: "V",
      },
    });
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Success",
        message: "File attached",
        variant: "success",
      })
    );
  }
}
