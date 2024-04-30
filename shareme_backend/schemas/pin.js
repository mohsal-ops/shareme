export default{
    name:'pin',
    title:'Pin',
    type:'document',
    fields:[
    {
        name:'title',
        title:'Title',
        type:'string',
    },
    {
        name:'about',
        title:'About',
        type:'string',
    },
    {
        name:'destination',
        title:'Destination',
        type:'url',
    },
    {
        name:'image',
        title:'Image',
        type:'image',
        Options: {
            hotspot: true,
        }
    },
    {
        name:'category',
        title:'Category',
        type:'string',
    },
    {
        name:'userId',
        title:'UserId',
        type:'string',
    },
    {
        name:'postedBy',
        title:'PostedBy',
        type:'reference',
        to :[{type: 'user'}]
    },
    {
        name:'save',
        title:'Save',
        type:'array',
        of:[{type : 'save'}]
    },
    {
        name:'comments',
        title:'Comments',
        type: 'array' ,
        of:[{type : 'comment'}]
    },




]
}