import { api, LightningElement } from 'lwc';

export default class OfflineFieldView extends LightningElement {
    @api
    label;

    @api
    name;

    _record = null;

    @api
    set record(rec) {
        this._record = rec;
    }

    get record() {
        return this._record;
    }

    get value() {
        if (this.record && this.record.data && this.record.data.fields) {
            const field = this.record.data.fields[this.name];
            if (field != null) {
                return formatForDisplay(field.displayValue ? field.displayValue : field.value);
            }
        }
        return null
    }

    get previousValue() {
        if (!this.isAvailableInDraft) return null;
        const field = this.record.data.drafts.serverValues[this.name];
        return formatForDisplay(field.displayValue ? field.displayValue : field.value);
    }

    get showPreviousValue() {
        return this.isAvailableInDraft &&
            this.previousValue &&
            this.value !== this.previousValue;
    }

    get fieldValueClass() {
        let cssClass = 'field-value';

        if (this.showPreviousValue) {
            cssClass += ' slds-p-top_small';
        }
        if (this.isAvailableInDraft && this.previousValue != this.value) {
            cssClass += ' updated-field-value'
        }
        return cssClass;
    }

    get isAvailableInDraft() {
        return this.record &&
            this.record.data &&
            this.record.data.drafts && 
            this.record.data.drafts.serverValues && 
            this.record.data.drafts.serverValues[this.name];
    }
}

export function formatForDisplay(value) {
    function formatUTC(value) {
        if (value && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{3})?Z/)) {
            return (new Date(value)).toLocaleString();
        }
        return null;
    }

    return formatUTC(value) || value;
}
