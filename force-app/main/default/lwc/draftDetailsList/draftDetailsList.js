import { LightningElement, api, track, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

export default class DraftDetailsList extends LightningElement {
  @api recordId;
  @api fields;

  @track drafts;

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  wiredRecord({ error, data }) {
    if (data?.drafts?.serverValues) {
      // flatten the serverValues
      const draftChanges = data?.drafts?.serverValues;
      const serverChanges = Object.keys(draftChanges).map((key) => ({
        fieldName: key,
        ...draftChanges[key],
      }));

      this.drafts = serverChanges;
    } else if (error) {
      console.error("Error occurred retrieving drafts.", error);
    }
  }
}
