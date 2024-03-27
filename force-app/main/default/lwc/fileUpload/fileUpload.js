import { LightningElement, api, wire, track } from "lwc";
import {
  createContentDocumentAndVersion,
  createRecord,
} from "lightning/uiRecordApi";
import { getObjectInfos } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTENT_DOCUMENT_LINK from "@salesforce/schema/ContentDocumentLink";
import CONTENT_DOCUMENT from "@salesforce/schema/ContentDocument";
import CONTENT_VERSION from "@salesforce/schema/ContentVersion";

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

  // Object metadata are required for creating records in offline. The wire adapter is added here to ensure the content metadata are primed.
  @wire(getObjectInfos, {
    objectApiNames: [CONTENT_DOCUMENT_LINK, CONTENT_DOCUMENT, CONTENT_VERSION],
  })
  objectMetadata;

  // This getter is only used for local processing. It does not need to be enabled for offline caching.
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-getter-contains-more-than-return-statement
  get fileName() {
    // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unsupported-member-variable-in-member-expression
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
      const contentDocumentAndVersion = await createContentDocumentAndVersion({
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
      }),
    );
  }
}
