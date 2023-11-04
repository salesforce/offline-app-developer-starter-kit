import { LightningElement, api, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import {
  unstable_createContentDocumentAndVersion,
  createRecord,
} from "lightning/uiRecordApi";
// Imports for forced-prime ObjectInfo metadata work-around
import { getObjectInfos } from "lightning/uiObjectInfoApi";
import CONTENT_DOCUMENT from "@salesforce/schema/ContentDocument";
import CONTENT_VERSION from "@salesforce/schema/ContentVersion";
import CONTENT_DOCUMENT_LINK from "@salesforce/schema/ContentDocumentLink";

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

  // Object metadata, or "ObjectInfo", is required for creating records
  // while offline. Use the getObjectInfos adapter to "force-prime" the
  // necessary object metadata. This is a work-around for the static analyzer
  // not knowing enough about the file object schema.
  @wire(getObjectInfos, {
    objectApiNames: [CONTENT_DOCUMENT, CONTENT_VERSION, CONTENT_DOCUMENT_LINK],
  })
  objectMetadata;

  // Getter used for local-only processing. Not needed for offline caching.
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-getter-contains-more-than-return-statement
  get fileName() {
    // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unsupported-member-variable-in-member-expression
    const file = this.files && this.files[0];
    if (file) {
      return file.name;
    }
    return undefined;
  }

  // Input handlers
  handleFilesInputChange(event) {
    this.files = event.detail.files;
    this.titleValue = this.fileName;
  }

  handleTitleInputChange(event) {
    this.titleValue = event.detail.value;
  }

  handleDescriptionInputChange(event) {
    this.descriptionValue = event.detail.value;
  }

  // Restore UI to default state
  resetInputs() {
    this.files = [];
    this.titleValue = "";
    this.descriptionValue = "";
    this.errorMessage = "";
  }

  // Handle uploading a file, initiated by user clicking Upload button
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

      // Create a ContentDocument and related ContentDocumentVersion for
      // the file, effectively uploading it
      const contentDocumentAndVersion =
        await unstable_createContentDocumentAndVersion({
          title: this.titleValue,
          description: this.descriptionValue,
          fileData: file,
        });

      // If component is run in a record context (recordId is set), relate
      // the uploaded file to that record
      if (this.recordId) {
        const contentDocumentId = contentDocumentAndVersion.contentDocument.id;

        // Create a ContentDocumentLink (CDL) to associate the uploaded file
        // to the Files related list of the target recordId
        await this.createContentDocumentLink(this.recordId, contentDocumentId);
      }

      // Status and state updates
      console.log(
        "ContentDocument and ContentDocumentVersion records created."
      );
      this.notifySuccess();
      this.resetInputs();
    } catch (error) {
      console.error(error);
      this.errorMessage = error;
    } finally {
      this.uploadingFile = false;
    }
  }

  // Create link between new file upload and target record
  async createContentDocumentLink(recordId, contentDocumentId) {
    await createRecord({
      apiName: "ContentDocumentLink",
      fields: {
        LinkedEntityId: recordId,
        ContentDocumentId: contentDocumentId,
        ShareType: "V",
      },
    });
    console.log("ContentDocumentLink record created.");
  }

  notifySuccess() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Upload Successful",
        message: "File enqueued for upload.",
        variant: "success",
      })
    );
  }
}
