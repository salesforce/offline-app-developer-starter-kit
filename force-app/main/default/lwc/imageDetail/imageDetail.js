import { LightningElement, api, wire } from "lwc";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import IMAGE_URL_FIELD from "@salesforce/schema/ContentDocument.LatestPublishedVersion.VersionDataUrl";
import IMAGE_TITLE_FIELD from "@salesforce/schema/ContentDocument.Title";

export default class ImageDetail extends LightningElement {
  @api recordfield;

  @wire(getRecord, {
    recordId: "$recordfield",
    fields: [IMAGE_URL_FIELD, IMAGE_TITLE_FIELD],
  })
  contentDocImage;

  get imageUrl() {
    return getFieldValue(this.contentDocImage.data, IMAGE_URL_FIELD);
  }

  get imageTitle() {
    return getFieldValue(this.contentDocImage.data, IMAGE_TITLE_FIELD);
  }
}
