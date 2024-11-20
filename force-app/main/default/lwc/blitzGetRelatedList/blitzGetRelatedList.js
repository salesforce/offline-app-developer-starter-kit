import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords, getRelatedListCount } from 'lightning/uiRelatedListApi';

export default class BlitzGetRelatedList extends LightningElement {

    @wire(getRelatedListRecords, {
        parentRecordId: '001RM000003UNu6YAG',
        relatedListId: 'Contacts',
        fields: ['Contact.Name','Contact.Id'],
        sortBy: ['Contact.Name']
    })
    onResult1({data, error}) {
    }

    @wire(getRelatedListCount, {
        parentRecordId: '001RM000003UNu6YAG',
        relatedListId: 'Contacts',
    })
    onResult2({data, error}) {

    }
}