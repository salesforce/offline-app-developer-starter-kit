import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { fieldsForCompactLayout } from "c/utils";

export default class ViewRecord extends LightningElement {
  @api recordId;
  @api objectApiName;
  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  _fields = [];

  get fields() {
    return this._fields;
  }

  connectedCallback() {
    this._fields = fieldsForCompactLayout(this.objectApiName);
  }

  get name() {
    return this.recordDataExists &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }

  get draftDetails() {
    if (
      !(
        this.recordDataExists &&
        this.record.data.drafts &&
        this.record.data.drafts.serverValues
      )
    ) {
      return null;
    }

    // flatten the serverValues
    const draftChanges = this.record.data.drafts.serverValues;
    const serverChanges = Object.keys(draftChanges).map((key) => ({
      fieldName: key,
      ...draftChanges[key],
    }));

    return serverChanges;
  }

  get recordDataExists() {
    return this.record && this.record.data;
  }

  get cardIconName() {
    return `standard:${
      this.objectApiName ? this.objectApiName.toLowerCase() : ""
    }`;
  }
}
