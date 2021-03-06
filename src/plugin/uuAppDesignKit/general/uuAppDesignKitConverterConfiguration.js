export default [
  {
    marker: "{UuSubAppDataStoreList}",
    endMarker: "{/UuSubAppDataStoreList}",
    tagName: "UuApp.DesignKit.UuSubAppDataStoreList",
    columns: [
      { linkSupported: true, name: "Name" },
      // TODO this property(indent) is maybe not needed at all
      { indent: 1, name: "Type" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UuCmdList}",
    endMarker: "{/UuCmdList}",
    tagName: "UuApp.DesignKit.UuCmdList",
    attributes: ["bookUri"],
    columns: [
      { linkSupported: true, name: "Name" },
      // TODO this property(indent) is maybe not needed at all
      { indent: 1, name: "Priority" },
      { indent: 1, name: "Complexity" },
      { indent: 1, name: "Profiles" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UuSubAppInfo}",
    endMarker: "{/UuSubAppInfo}",
    tagName: "UuApp.DesignKit.UuSubAppInfo",
    items: [
      { name: "Name" },
      { name: "Type" },
      { name: "Description" },
      { linkSupported: true, name: "Git" }
    ]
  },
  {
    marker: "{UU5UveInfo}",
    endMarker: "{/UU5UveInfo}",
    tagName: "UuApp.DesignKit.UU5UveInfo",
    items: [
      { name: "Name" },
      { name: "Description" },
      { name: "Uri" },
      { name: "Source" },
      { name: "Spa tag name" },
      { name: "Spa source" },
      { name: "Spa less" }
    ]
  },
  {
    marker: "{UU5RouteList}",
    endMarker: "{/UU5RouteList}",
    tagName: "UuApp.DesignKit.UU5RouteList",
    columns: [
      { linkSupported: true, name: "Name" },
      { indent: 1, name: "Priority" },
      { indent: 1, name: "Complexity" },
      { indent: 1, name: "Profiles" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UU5RouteInfo}",
    endMarker: "{/UU5RouteInfo}",
    tagName: "UuApp.DesignKit.UU5RouteInfo",
    items: [
      { name: "Name" },
      { name: "Description" },
      { name: "Uri" },
      { name: "Tag name" },
      { name: "Source" },
      { name: "Less" }
    ]
  },
  {
    marker: "{UU5ComponentInfo}",
    endMarker: "{/UU5ComponentInfo}",
    tagName: "UuApp.DesignKit.UU5ComponentInfo",
    items: [
      { name: "Tag name" },
      { name: "Source" },
      { name: "Less" },
      { name: "Description" }
    ]
  },
  {
    marker: "{UU5ComponentMixins}",
    endMarker: "{/UU5ComponentMixins}",
    tagName: "UuApp.DesignKit.UU5ComponentMixins",
    singleColumn: { linkSupported: true }
  },
  {
    marker: "{UuAppProfileList}",
    endMarker: "{/UuAppProfileList}",
    tagName: "UuApp.DesignKit.UuAppProfileList",
    columns: [{ name: "Name" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{UU5ComponentList}",
    endMarker: "{/UU5ComponentList}",
    tagName: "UuApp.DesignKit.UU5ComponentList",
    columns: [
      { linkSupported: true, name: "Name" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UU5UveList}",
    endMarker: "{/UU5UveList}",
    tagName: "UuApp.DesignKit.UU5UveList",
    columns: [
      { linkSupported: true, name: "Name" },
      { indent: 1, name: "Priority" },
      { indent: 1, name: "Complexity" },
      { indent: 1, name: "Profiles" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UuCmdErrorList}",
    endMarker: "{/UuCmdErrorList}",
    tagName: "UuApp.DesignKit.UuCmdErrorList",
    columns: [
      { name: "Code" },
      // TODO this property(indent) is maybe not needed at all
      { indent: 1, name: "Type" },
      { indent: 1, name: "Message" },
      { indent: 1, name: "Props" }
    ]
  },
  {
    marker: "{UuCmdInfo}",
    endMarker: "{/UuCmdInfo}",
    tagName: "UuApp.DesignKit.UuCmdInfo",
    items: [
      { name: "Name" },
      { name: "Description" },
      { name: "Type" },
      { name: "Url" },
      { name: "Profiles" }
    ]
  },
  {
    marker: "{UuCmdDefaultValueList}",
    endMarker: "{/UuCmdDefaultValueList}",
    tagName: "UuApp.DesignKit.UuCmdDefaultValueList",
    columns: [{ name: "Key" }, { indent: 1, name: "Value" }]
  },
  {
    marker: "{DescriptionList}",
    endMarker: "{/DescriptionList}",
    tagName: "UuApp.DesignKit.DescriptionList",
    columns: [{ name: "Object" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{BusinessRoleList}",
    endMarker: "{/BusinessRoleList}",
    tagName: "UuApp.DesignKit.BusinessRoleList",
    columns: [{ name: "Name" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{BusinessProcessList}",
    endMarker: "{/BusinessProcessList}",
    tagName: "UuApp.DesignKit.BusinessProcessList",
    columns: [{ name: "Name" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{BusinessUseCaseList}",
    endMarker: "{/BusinessUseCaseList}",
    tagName: "UuApp.DesignKit.BusinessUseCaseList",
    columns: [
      { name: "Name" },
      { indent: 1, name: "Priority" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UuAppObjectStoreSchemaList}",
    endMarker: "{/UuAppObjectStoreSchemaList}",
    tagName: "UuApp.DesignKit.UuAppObjectStoreSchemaList",
    columns: [{ name: "Schema" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{UuAppBinaryStoreInfo}",
    endMarker: "{/UuAppBinaryStoreInfo}",
    tagName: "UuApp.DesignKit.UuAppBinaryStoreInfo",
    items: [{ name: "Name" }, { name: "Description" }]
  },
  {
    marker: "{UuAppObjectStoreSchemaLimitList}",
    endMarker: "{/UuAppObjectStoreSchemaLimitList}",
    tagName: "UuApp.DesignKit.UuAppObjectStoreSchemaLimitList",
    columns: [
      { name: "Name" },
      { indent: 1, name: "Value" },
      { indent: 1, name: "Description" }
    ]
  },
  {
    marker: "{UuAppObjectStoreSchemaIndexList}",
    endMarker: "{/UuAppObjectStoreSchemaIndexList}",
    tagName: "UuApp.DesignKit.UuAppObjectStoreSchemaIndexList",
    columns: [{ name: "Index" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{UuAppObjectStoreInfo}",
    endMarker: "{/UuAppObjectStoreInfo}",
    tagName: "UuApp.DesignKit.UuAppObjectStoreInfo",
    items: [{ name: "Name" }, { name: "Description" }]
  },
  {
    marker: "{UuAppObjectStoreSchemaDaoMethodList}",
    endMarker: "{/UuAppObjectStoreSchemaDaoMethodList}",
    tagName: "UuApp.DesignKit.UuAppObjectStoreSchemaDaoMethodList",
    columns: [{ name: "Method" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{UuAppBinaryStoreInfo}",
    endMarker: "{/UuAppBinaryStoreInfo}",
    tagName: "UuApp.DesignKit.UuAppBinaryStoreInfo",
    items: [{ name: "Name" }, { name: "Description" }]
  },
  {
    marker: "{UuAppBinaryStoreSchemaDaoMethodList}",
    endMarker: "{/UuAppBinaryStoreSchemaDaoMethodList}",
    tagName: "UuApp.DesignKit.UuAppBinaryStoreSchemaDaoMethodList",
    columns: [{ name: "Name" }, { indent: 1, name: "Description" }]
  },
  {
    marker: "{Table}",
    endMarker: "{/Table}",
    tagName: "UuApp.DesignKit.Table",
    attributes: ["colHeader", "rowHeader", "transpose"],
    columns: [{}, { indent: 1 }],
    dynamicColumns: true
  }
];
