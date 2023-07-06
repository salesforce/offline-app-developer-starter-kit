import { LightningElement, api, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";

export default class FilesPage extends LightningElement {
  // This allows the component to be placed on a record page, or other record
  // context, and receive the record's ID when it runs
  @api
  recordId;

  // Retrieve the related Files for a record.
  // A ContentDocumentLink connects to a ContentDocument which has a ContentDocumentVersion
  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: "ContentDocumentLinks",
    fields: ["ContentDocumentLink.ContentDocumentId"],
  })
  relatedFiles;

  get relatedFileData() {
    // Restrict to first 5 items for priming performance reasons
    return this.relatedFiles.data?.records.slice(0, 5);
  }
}
