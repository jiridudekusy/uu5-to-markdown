# Core Concepts

Standing data are generally data, which, from the application point of view, remain mostly unchanged and are highly reusable. Standing data are divided into two groups: **reference and master data**.

***Reference data*** gain in value when they are widely re-used and widely referenced. Typically, they do not change overly much in terms of definition, apart from occasional revisions. Reference data are often defined by standards organizations, such as country codes as defined in ISO 3166-1 (a good example of reference data are currency codes, country codes,…).

***Master data*** on the other hand represent key business entities needed by the application, such as customer (e.g., for customers: number, name, address, and date of account creation). In contrast, reference data usually consist only of a list of permissible values and attached textual descriptions. A further difference between reference data and master data is that a change to the reference data values may require an associated change in business process to support the change; a change in master data will always be managed as part of existing business processes (i.e. commands).

## Supported Functionality

<Plus4U5.UuBmlDraw.Image className="center" code="sdmHlcFeatures"/>

*Standing Data Management* component will provide these features:

*   Abstract object constructs supporting basic, combined and extended standing data with support for additional attributes (different business types such as number, text, datetime, boolean, binary, color etc.)
*   API for standard CRUD operations (GUI is not part of this iteration)
*   Validations of attributes - mandatory/optional, minimum/maximum value for numbers, minimum/maximum length, date/time etc.
*   Ordering of the records, with support for overriding default behaviour.
*   Hierarchy - support of linking the standing data together using the parent-child relation (1:N) or by combining of two or more standing data together (combined standing data, representing M:N relation)
*   Time validity from/to for effectively dated standing data, including unlimited validity, reference integrity of relation between standing data records (e.g. the validity of child record must not exceed the validity of the corresponding parent record)
*   Standard commands to import/export standing data and means to simply use this data at the user interface.

### Attribute Constraints and Validations

Validation and constraint checking is done through standard *uuApp Server Validation framework*. Each *standing data type* can define, which validation schema is used for validation during creation of a new *standing data items* or modification of existing items (e.g. during import operation). Validation works same as validation of input DTOs while processing commands. There is no need to specify validation schema for ***simple*** and ***combined*** standing data types if there is no need for any custom validations. If not overridden, these are then validated against default validation schemas as mentioned in chapter "Standing data types".

The validations are applied only to the updated items - they do not propagate to referenced standing data types. As a consequence, when a standing data item passes validations and the change is applied, this change may render another combined data item, which references the changed item, invalid by the time validation rules. Such propagated validations can be quite demanding when applied to large data sets. To simplify the component, detection of these situations won’t be implemented in the first phase, but it may be a subject for improvement in the future.

<UuDocKit.Bricks.BlockInfo>Note that, each item of the <UU5.Bricks.Em>standing data type</UU5.Bricks.Em> is validated against defined validation schema.</UuDocKit.Bricks.BlockInfo>

### Ordering (sorting)

Ordering of *standing data items* is implicitly by natural alphabetical order of the *standing data item* names (labels). Each item has an `order` attribute that explicitly defines the position of the item. The `order` attribute overrides the implicit sort by the item name if it is specified. *Standing Data Management* component doesn’t support ordering of application-specific domain classes that reference standing data items (references are represented only as codes stored within the entity). It is taken as responsibility of target application to implement custom domain object sorting by referenced standing data items.

### Time Validity

Each *standing data item* has a time validity, which defines the time range for which is the specific standing data item valid. This can be configured for each standing data type separately by setting time validity flag to true or false depending on whether the standing data type has limited or unlimited time validity. Time validity can also be unbound from one or both sides, either valid from start of the epoch and/or valid indefinitely, simply by not setting the respective attributes.

<UuDocKit.Bricks.BlockInfo>The time granularity of validity interval is <UU5.Bricks.Strong>one hour</UU5.Bricks.Strong>.</UuDocKit.Bricks.BlockInfo>

Time validity interval can also be discontinuous, this state is represented by creating multiple *standing data items* with the same attributes except the interval sections for which they are active. Other attributes may also vary in time, only code must stay the same for logical reasons. This generally means, that there can be as many instances of the *standing data item* with the same code as long as the time validity intervals doesn’t overlap. **Two or more standing data items, that are continuous in time (i.e. when one ends, the second one begins at the same exact time) are taken as non-overlapping.**

In most cases the standing data management doesn’t delete standing data items, but only changes their active flag instead, so that the unwanted data item is invalid and therefore cannot be used further. There are however cases, when deletion is needed and standing data management provides functionality for these cases, for more see the [technical design](https://uuos9.plus4u.net/uu-dockitg01-main/78462435-9ab38fdad41947d2afa9b2c7fe0522c6/book/page?code=sdmTechOverview). The inactive standing data items can however be returned as part of a business entity through reference, if the creation of given business entity falls within the time range, when the standing data item was valid.

<UuDocKit.Bricks.BlockInfo>Note that, combined standing data cannot exceed time validity of standing data items it combines (e.g. generally the two or more linked standing data items must not have incoherent time validity intervals)</UuDocKit.Bricks.BlockInfo>

# Standing Data Types

*UuAppServer Standing Data Management* component supports multiple types of standing data as described in following chapters.

<Plus4U5.UuBmlDraw.Image className="center" code="sdmStandingDataTypes"/>

Each **Standing data type** is generally defined by these attributes:

| Attribute | Description |
| --- | --- |
| code | Unique code of the standing data type |
| name | Name or short description of the standing data type |
| validationSchema | Validation schema that is used to validate each item of the standing data type, more in chapter *Attribute constraints and validations* |
| accessRights | List of profiles and their granted access, more in Permissions. |
| hasTimeValidity | Indication, whether this standing data type supports time validity. |
| classification | Classification of the standing data type, either simple of combined. |
| active | Indication, whether this standing data type is active or not (no matter the standing data items time validity) |

Each **Standing data item** is generally defined by these attributes:

| Attribute | Description |
| --- | --- |
| code | Code of the standing data item. |
| altCodes | List of alternative codes of the standing data item, which can be used to look up the standing data item, but cannot be used as a reference in combined standing data type items. Each alternative code has an attached “type” attribute, which classifies the alternative code. |
| name | Name or short description of the standing data item, i.e. what is displayed at front-end. |
| value | Value of the standing data item. For example, simple standing data item representing number Pi could have code "PI", name “Number Pi” and value "3.1415…". |
| description | Longer description of the standing data item. |
| active | Indication, whether this standing data type is active or not (no matter the standing data items time validity) |
| validFromTs: datetime | Start of the data item validity. If empty, it is presumed, that the item was valid from the start of the epoch. |
| validToTs: datetime | End of the data item validity. If empty, it is presumed, that the item will be valid indefinitely. |
| order | Position of the standing data item when returned as part of the collection of standing data items. |

<UuDocKit.Bricks.BlockInfo>Note that, code and any alternative code (altCodes) of the standing data item is unique only for each point in time, i.e. there can be several standing data items with the same code as long as their validity doesn't overlap (doesn't apply for standing data type with no time validity)</UuDocKit.Bricks.BlockInfo>

Because of the nature of the *standing data*, it is presumed, that all *standing data types* definitions are static during application lifetime and their change should be part of a change in business process, i.e. all *standing data types* are created in context of some business process. There is no need for dynamic addition of ***standing data types***, as there would be no business process that could “use” them. The definition of standing data types will be loaded and processed during the initialization of a workspace.

Additional attributes are described in further chapters in their respective standing data type chapter.

## Simple Standing Data

Simple standing data type is formal definition of one data set describing an area of interest and which restricts the possible description of given area into fixed set of values. Simple standing data types are therefore simple sets of codes (and sometimes values) paired with description (names).

Simple standing data type is defined as follows (only definition, not validation):

```js
const simpleStandingDataType = shape({
  code: string().isRequired(), //unique code of the standing data type
  name: string().isRequired(), //name of the standing data type
  validationSchema: string.isRequired(), //schema used to validate standing data
  hasTimeValidity: boolean().isRequired(), //indication if this data type supports time validity
  classification: string().oneOf(["simple","combined","extended"]).isRequired(),
  active: boolean(), //active marker
  accessRights: array(
     shape({
       accessType: string().oneOf(["read","read_write"]), //type of the granted access
       profile: string().isRequired() //profile to which the access is granted
     }).isRequired()
  )
});

```

Simple standing data (value in the simple standing data type) is then defined below. Note that, this schema is also used as default validation schema for simple standing data.

```js
const simpleStandingDataItemType = shape({
  code: string().isRequired(), //unique code of the standing data
  name: string().isRequired(), //name of the standing data
  value: string(), //value of the standing data item, if different to code
  altCodes: array(shape({
    altCode: string(), //alternative code
    type: string() //type or classification od the alternative code
  })), //array of alternate codes of the standing data item
  description: string(), //longer description of this standing data item
  typeCode: string().isRequired(), //code of the standing data type to which this item belongs
  active: boolean(), //active marker
  order: number(), //position of the standing data item
  validFromTs: datetime(), //start of the data item validity
  validToTs: datetime() //end of the data item validity
});

```

### Example of Simple Standing Data

```js
const countryStandingDataType = {
  code: "COUNTRY",
  name: "Country ISO codes",
  hasTimeValidity: true,
  active: true,
  validationSchema: "defaultSimpleStandingDataType",
  accessRights: [{
    //omitted
  }]
};

const countryStandingDataItem = {
  code: "CZE", //unique code of the standing data type
  name: "Czech Republic", //name of the standing data type
  typeCode: "COUNTRY", //code of the standing data type
  active: true,
  order: 1,
  validFromTs: "2017-10-15T00:00Z" //start of the data item validity
  // end of the validity period not specified -> validity is not limited
};

```

## Combined Standing Data

Combined standing data type represents a named relation between two or more *simple* and/or *combined* standing data or constant values. Using constant values in combined standing data type means that instead of connecting other standing data items together, the combined standing data type can combine string (constant) values.

These combined standing data can represent both 1:N or N:M relations, if only two references are used, **but there is no limit to what number of references the combined standing data type can have**.

<UuDocKit.Bricks.BlockInfo glyphicon="mdi mdi-hand-pointing-right">Note that combined standing data type can reference also extended standing data type(s)</UuDocKit.Bricks.BlockInfo>

To support combination of references and values (as described in the beginning of this chapter), the type of combined item can be either ***reference*** or ***value***. The ***reference*** type is used to create an association with another standing data type. The linked standing data type is identified using its code, which is put into the refCode attribute of the combined standing data type (see the validation schema below). On the other hand, when the combined data type has the ***value*** type, the values are not references to some other standing data type, but only constants standing on their own. The reference validation does not apply to these.

<UuDocKit.Bricks.BlockInfo>If the same standing data type is used in the combined standing data type more than once, the additional name is defined for each occurrence of the same standing data type to distinguish them.</UuDocKit.Bricks.BlockInfo>

Combined standing data type is defined as follows (only definition, not validation):

```js
const combinedStandingDataType = shape({
  code: string().isRequired(), //unique code of the standing data type
  name: string().isRequired(), //name of the standing data type
  validationSchema: string.isRequired(), //schema used to validate standing data
  hasTimeValidity: boolean().isRequired(), //indication if this data type supports time validity
  active: boolean(), //active marker,
  classification: string().oneOf(["simple","combined","extended"]).isRequired(),
  combinedTypes: array(shape({
    type: string().oneOf(["reference","value"]).isRequired(), //type of the reference
    name: string().isRequired(), //name of the reference, used to distinguish the combined items if they are values or reference the same standing data type. Must be unique in the scope of one combined standing data type.
    refCode : string() //reference to the another standing data type, if the combinedType type is "reference". Not used when the type is "value".
  })).isRequired(), //standing data types or constants combined into this type
  accessRights: array(
     shape({
       accessType: string().oneOf(["read","read_write"]), //type of the granted access
       profile: string().isRequired() //profile in which the access is granted
     })
  )
});

```

Combined standing data item (value in the combined standing data type) is then defined below. Note that, this schema is also used as default validation schema for combined standing data.

```js
const combinedStandingDataItemType = shape({
  code: string().isRequired(), //unique code of the standing data
  name: string().isRequired(), //name of the standing data
  altCodes: array(shape({
    altCode: string(), //alternative code
    type: string() //type or classification od the alternative code
  })), //array of alternate codes of the standing data item
  description: string(), //longer description of this standing data item
  typeCode: string().isRequired(), //code of the standing data type to which this item belongs
  active: boolean(), //active marker
  order: number(), //position of the standing data item
  validFromTs: datetime(), //start of the data item validity
  validToTs: datetime(), //end of the data item validity
  combinedValues: array(string()) //codes of the standing data types (references) or values combined into this type
});

```
<UuDocKit.Bricks.BlockWarning>The order of the standing data type combinedValues must match the order of the defined combinedTypes in the combined standing data type definition!</UuDocKit.Bricks.BlockWarning>

### Examples of Combined Standing Data

```js
const borderStandingDataType = {
  code: "BORDER",
  name: "Country border",
  validationSchema: "defaultCombinedStandingDataType",
  hasTimeValidity: true,
  active: true,
  combinedTypes : [
    {
      type: "reference",
      name: "Area-in",
      refCode: "COUNTRY"
    },
    {
      type: "reference",
      name: "Area-out",
      refCode: "COUNTRY"
    }
  ],
  accessRights: [{
    //omitted
  }]
};

const borderStandingDataItem = {
  code: "CZE-DEU", //unique code of the standing data type
  name: "Czech Republic - Germany border", //name of the standing data type
  typeCode: "BORDER", //code of the standing data type
  combinedValues: ["CZE", "DEU"],
  active: true,
  validFromTs: "2017-10-15T00:00Z", //start of the data item validity
  validToTs: "2018-10-15T00:00Z" //end of the data item validity
};

```

## Extended Standing Data

*Extended standing data type* represents more complex standing data, either simple or combined extended with additional attributes. The extended standing data are, mainly, key business entities needed by the application, but as any other standing data type, they remain mostly unchanged during application lifetime. As opposed to simple or combined standing data, these can define their own fields. *Extended standing data type* cannot extend other extended standing data type.

Extended simple or combined standing data type is defined same as in previous chapters but contains additional attributes. The structure of the *extended standing data items* is limited and controlled by defined entity object and used validation schema in the *standing data type* definition. Validation of *standing data item* containing more attributes than defined in validation schema would fail.

### Examples of Extended Standing Data

```js
const countryStandingDataType = {
  code: "EXTENDED_BORDER",
  name: "Country borders with extended data",
  validationSchema: "extendedBorderStandingDataType", // custom validation schema to validate also additional attributes
  hasTimeValidity: true,
  active: true,
  classification: "extended", //classification of the extended standing data type - simple, combined or extended
  combinedTypes : [
    {
      type: "reference",
      name: "Area-in",
      refCode: "COUNTRY"
    },
    {
      type: "reference",
      name: "Area-out",
      refCode: "COUNTRY"
    }
  ],
  accessRights: [{
    //omitted
  }]
};

const extendedStandingDataItemType = {
  code: "CZE-DEU", //unique code of the standing data type
  name: "Czech Republic - Germany border", //name of the standing data type
  typeCode: "EXTENDED_BORDER", //code of the standing data type
  combinedValues: ["CZE", "DEU"],
  active: true,
  order: 1,
  validFromTs: "2017-10-15T00:00Z", //start of the data item validity
  validToTs: "2018-10-15T00:00Z", //end of the data item validity
  //Additional attributes as needed.
  numOfBorderCrossings: 23,
  borderLength: 810.7
};

```

# Provided Commands

The component will allow to export or import the content (list of the records and their attributes) of any standing data type to/from XML in the unified generic form. This functionality will be used for:

*   executing batch management operations on the standing data
*   management of standing data types whose content changes rather rarely and it is not worth to implement GUI administration for it

*Plans for future versions include a generic interface + GUI for standing data management. See [Possible improvements](https://uuos9.plus4u.net/uu-dockitg01-main/78462435-9ab38fdad41947d2afa9b2c7fe0522c6/book/page?code=sdmPossibleImprovements).*

## XML Definition

Both import and export standing data commands work with the same representation of data in XML file. This defines list of all ***Standing data types*** and values they contain, as in example below. **Tag names and XML form is not final and may be altered during the implementation phase.**

<UuDocKit.Bricks.BlockInfo>Note that, referenced <UU5.Bricks.Strong>standing data types</UU5.Bricks.Strong> (either through hierarchy or by combined standing data type) must be declared **before** standing data types, where they are referenced.</UuDocKit.Bricks.BlockInfo>

```xml
  <!-- Example of simple standing data type. -->

  <standingDataType>
    <standingDataTypeCode>CURRENCY</standingDataTypeCode>;
    <items>
      <standingDataItem>
         <code>CZK</code>
         <alternativeCodes>
          <alternativeCode>
            <code>KČ</code>
            <type>cz</type>
          </alternativeCode>
          <!-- More items omitted -->
         </alternativeCodes>
         <name>Czech crown</name>
         <value>CZK</value>
         <active>true</active>
         <order>1</order>
         <validFromTs>2017-10-15T00:00Z</validFromTs>
         <validToTs>2018-10-15T00:00Z</validToTs>
       </standingDataItem>
       <!-- More items omitted -->
    </items>
</standingDataType>

```

```xml
  <!-- Example of combined standing data type. -->

  <standingDataType>
    <standingDataTypeCode>COUNTRY_CURRENCY</standingDataTypeCode>
    <items>
      <standingDataItemType>
         <code>CZE_CZK</code>
         <alternativeCodes>
          <alternativeCode>
            <code>CZE_KČ</code>
            <type>cz</type>
          </alternativeCode>
          <!-- More items omitted -->
         </alternativeCodes>
         <name>Czech Republic - Czech crown</name>
         <value>CZE_CZK</value>
         <refValues>
          <refValue>CZE</refValue>
          <refValue>CZK</refValue>
         </refValues>
         <order>1</order>
         <validFromTs>2017-10-15T00:00Z</validFromTs>
         <validToTs>2018-10-15T00:00Z</validToTs>
       </standingDataItemType>
    </items>
    <!-- More items omitted -->
  </standingDataType>

```

```xml
   <!-- Example of extended standing data type. -->

   <standingDataType>
     <standingDataTypeCode>BRANCH_OFFICE</standingDataTypeCode>
     <items>
       <standingDataItemType>
          <code>PRAGUE_HQ</code>
         <alternativeCodes>
          <alternativeCode>
            <code>PRAHA_CENTRALA</code>
            <type>cz</type>
          </alternativeCode>
          <!-- More items omitted -->
         </alternativeCodes>
          <value>PRAGUE_HQ</value>
          <name>Prague HQ</name>
          <order>1</order>
          <!-- Custom extended attributes follow -->
          <!-- There can be as much attributes as needed - this completely depends on the custom entity -->
          <address>Street 11, Prague 100 01</address>
          ...

          <validFromTs>2017-10-15T00:00Z</validFromTs>
          <validToTs>2018-10-15T00:00Z</validToTs>
        </standingDataItemType>
     </items>
     <!-- More items omitted -->
   </standingDataType>

```
