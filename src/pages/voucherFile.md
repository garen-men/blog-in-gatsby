---
path: "/voucherFile"
date: "2017-07-14T03:49:16.408Z"
title: "Hello World"
tags: ["first"]
---
旧版单据公共下开发

# 现在有哪些可共用的UI组件

红蓝单、单据日期编号、极简模式和大图模式行高调整、汇总表、商品参照、批次参照、扫码录入、子表批量录入、增行、删行、复制行、底部若干按钮

侧滑：草稿、全屏、附件

# 怎么改变字段的值，并监听字段value变化，如何防止死循环

监听到A字段变化，需要计算，改写B的值；同时，监听到B字段变化，需要计算，改写A的值

旧版单据：

使用文件src/modules/voucher/public/util/util.ts  中的

**addFieldListener**

**addFieldListenerSync**

两个方法

新版单据：使用FormController中dispatchAction方法（仅限于字段变化）

# 字段聚焦，失焦状态的监听

\```javascript

​	rowField.**select**('inAmount').**onStatePropChanged**('focused', (changed) => {    .......   })

\```

注意：这个方法的实现，是依赖autoRun，所以，返回值是类似析构函数，需要在销毁前执行该函数，释放监听动作

# 全键盘的个性化配置

全键盘的实现，可以简单理解成，单据公共维护了一个数组，用来存储，所有需要全键盘覆盖的UI组件，每个组件有一个Id，而这个ID代表一个field的path（也就是form里的一个字段名称），每个全键盘的ID内部，还可以由全键盘数组组成，每个全键盘组件，都必须遵循一定的接口规范，即可被聚焦，可被失焦等

\```javascript

​	export interface **IQwertItem** {

​    	qwertId: string;

​    	canActive**(direction?: **IQwertDirection): boolean;

​    	canDeactive**(direction: **IQwertDirection, keyCode: number, event?: any): boolean;

​    	active**(direction: **IQwertDirection): any;

​    	deactive(): any;

}

\```

在单据应用中，需要将自己定义的表尾组件，加入到全键盘的大数组中，配置十分简单：

\```javascript

​	qwertIds: ["promoList", "totalExtraDiscount"],

\```

只需在presenter的初始化initOptions中，配置表尾字段名称即可

# 怎么控制字段的可编辑状态

旧版单据公共

\```javascript

​	const XXXField = presenter.controllers.formController.form.**select**("XXX");

​	XXXField.disabled =  true;

\```

新版单据公共---具体可参照src/modules/order/sales/goods-issue/ui-state/goodsIssue-validator.ts 这个文件中useable属性的配置

# 怎么控制列的显示和隐藏

旧版单据公共

\```javascript

​	presenter.api.**setColumnVisible**(presenter["bodyFieldName"], getFieldNameInForm(STATIC_FIELD_NAME.inventoryLotNo), true);

\```

新版单据公共，具体可参照src/modules/order/sales/goods-issue/ui-state/goodsIssue-validator.ts 这个文件中visible属性的配置



# 怎么加校验

字段必填等校验，依赖单据模板，业务逻辑校验配置如下：

旧版单据公共

\```javascript

​	const  XXFieldValidator = (params: { field, **form** }) => {

​            if(YYYEXP) {

​                return [false, "校验错误的信息"];

​            }else{

​				return true;

​			}

​        };

​	rowField.**select**("XXX").**addValidator**(XXFieldValidator);

\```

新版单据公共:需要在BizService层配置，

如需新增校验，参考src/sales/sales-order/validator/inventory/mobileInventoryLotNoValidator.ts文件

还需增加整体校验配置文件，参考src/purchase/goods-receipt/validator/mobileGoodsReceiptFieldValidatorConfig.ts

# stateTree常见操作api

查询某个字段

presenter.controllers.formController.form.select('bizDate')

更新某个字段的值

presenter.controllers.formController.form.select('bizDate').sync(new Date());

查询某个字段的值（不推荐直接使用.value，尤其是靠根节点近的字段）

presenter.controllers.formController.form.select('bizDate').get('value')

查询某个字段的focus状态

presenter.controllers.formController.form.select('bizDate').focused

查询某个字段的可用状态

presenter.controllers.formController.form.select('bizDate').disabled

查询某个字段的错误信息

presenter.controllers.formController.form.select('bizDate').errors()

查询某个字段的警告信息

presenter.controllers.formController.form.select('bizDate').warning

其他值，参见源码

数组操作：

增加一个值：

presenter.controllers.formController.form.select('goodsItems').storedValue.push({uuid:"5"})

删除一个值

presenter.controllers.formController.form.select('goodsItems').storedValue.slice(0,1)

# 判断有效行，editFlag、sequenceNum的解释

有效行的概念是只子表，是否需要提交数据或校验数据的判断依据，需要在单据initOptions时配置，例如：

isEmptyRow**: (bodyFieldName, rowData) => !rowData['productId']



editFlag是前后端关于已经存在于数据库的子表数据的协议，new或空是新增，update是更新，delete是删除

sequenceNum是对子表顺序的描述，所有单据在查询时只按sequenceNum排序，一个特例：在sequenceNum=2的行前插入一行，新插入的行sequenceNum也等于2，方便后端识别位置，并且提高保存效率。

# 单据公共提供的一些常用方法

#### 旧版

###### ----------------BusinessController----------------

edit//跳转编辑态

view//跳转查看态

save//执行保存

goToNew//关闭当前页签并打开一个新的该单据页签

goToView//关闭当前页签并打开一个查看态的页签，查看ID靠参数

closeAndGotoEdit//关闭当前页签并打开一个页签编辑一张单据

saveTip//保存后的特殊提示

###### ----------------CommandController----------------

checkHasAuth //检查是否有权限

execute //执行某个命令

###### ----------------FormController----------------

validate//执行form校验

validateRow//执行某行校验

isEmptyRow//判断某行是否有效行

getPrintValue//获取打印数据

insertRow// 插入子表行

appendRow//追加子表行

deleteRow//删除子表行

##### 新版--只写差异

###### ----------------voucherPresenter----------------

refreshInitData//刷新整单数据

reloadData//翻页

----------------FormController----------------

dispatchAction//字段变化派发action

refreshAllForm//刷新所有form



# 单据的路由规则

##### 新增态页签规则：新建单据统一都打开一个新页签，

建议统一使用${this.path}/new${**Date**.**now**()}这样的跳转，path后的字符串为时间戳

##### 查看态页签规则：取系统选项，一类单据打开一个查看态页签 || 每张单据打开一个查看态页签

一类单据打开一个查看态页签 时 路由为：${VOUCHERPATH[boName]}/view${pageParams.voucherId}，特殊情况下，查看态必须打开另一个查看态，可以同时允许两个同类查看态页签存在，公共方法已经处理

每张单据打开一个查看态页签 时 路由未：${VOUCHERPATH[boName]}/view${boName}

建议使用src/routers/RouterMap.ts文件中的几个方法

jumpVoucherForView // 跳转到单据查看态

closeJumpVoucherForView // 关闭当前页签并跳转到单据查看态页签

##### 编辑态页签规则：每张单据打开一个页签

建议使用src/routers/RouterMap.ts文件中的几个方法

jumpVoucherForEdit // 跳转到单据编辑态

closeJumpVoucherForEdit // 关闭当前页签并跳转到单据编辑态页签





---------------新版单据公共下开发-----------

# dispatchAction、dispatchCommand

字段变化，建议使用通用的FormController中提供的dispatchAction方法

如果与字段变化无关，则推荐使用派发命令：

\```javascript

​	this.presenter.bizController.**dispatch**({

​      type: ActionTypeEnum.COMMAND,

​      path: "XXX",

​      params: {},

​      **respond**: (result: **IActionResult**) => { }

​    })

\```

# 通用的刷新页面方法

###### ----------------voucherPresenter----------------

refreshInitData//刷新整单数据

