2.1.1
-----
Bug fixes:
 - export `UU5.RichText.Block` plugin


2.1.0
-----
- support for `UU5.RichText.Block`

2.0.1
-----
Bug fixes:
 - Tag attributes with boolean values like contentEditable=false are now working.
 
2.0.0
-----
* Parser has been from `xmldom-uu5` to UU5String (official uu5string parser which is part of uu5g04)

0.4.2
-----

Bug fixes:
* Hotfix for [https://github.com/jiridudekusy/uuDockitHelper/issues/6](https://github.com/jiridudekusy/uuDockitHelper/issues/6) - if JSON cannot be parsed, try to remove double /  escaping. 

0.4.1
-----
* Supports empty footer attribute at `UU5.Bricks.Section` component, because uuDcc adds it.
* Add support for "UuAppObjectStoreInfo" and "UuAppBinaryStoreInfo" 
 
0.4.0
-----
* Basic support for dcc(Dynamic Component Content). If fact it means support for Lsi tags. The current support is limited only to single UU5.Bricks.Lsi.Item inside UU5.Bricks.Lsi. In the realization the Lsi items are just simply filtered out. If there are multiple Lsi.Item they are put as plain uu5 string to the result. By default "contentEdiatble" attribute is accepted at all components but it is put to none (it expect that default behavior of uuDcc is sufficient).

0.3.2
-----
* Fix bug https://github.com/jiridudekusy/uuDockitHelper/issues/3. Up to 99 items in list are supported.

0.3.1
-----
* UU5Prettifyer has been exported so it can be used by other apps.

0.3.0
-----
* Support uuBookKit 3.x (see [Changelog](https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-e3f5c648e85f4319bd8fc25ea5be6c2c/book/page?code=rn_3))
  * uuBmlDrawg03 is not yet supported. Please still use uuBmlDrawg02 
* Parts of page are no longer ended by `{partEnd}`, but must be prefixed by `{uuBookKit-part}{:"code": "<part code>"}`

0.2.0
-----
* All DesignKit components adds name of attribute(eg. Name : , Type : etc.) to the markdown and removes it during uu5->md and md->uu5 transformations. This improves readability of markdown. 
* Support for UuApp.DesignKit.Table with any number of columns 

0.1.x
-----
* See commits on github for change log.
