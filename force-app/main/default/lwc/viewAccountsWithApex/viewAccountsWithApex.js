import { LightningElement, wire } from "lwc";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";

export default class ViewAccountsWithApex extends LightningElement {
  @wire(getAccountList) accounts;
}
