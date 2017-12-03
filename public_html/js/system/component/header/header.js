moduloDirectivas.component('header', {
    templateUrl: "js/system/component/header/header.html",
    controllerAs: 'hd',
    controller: menuCtrl,
    bindings:
            {
                ob: '<',
                op: '<',
                xob: '<',
                xid: '<'
            }
});
function menuCtrl(objectService, serverCallService) {
    var self = this;
    this.$onInit = function () {
        self.objectName = objectService.getName(self.ob);
        self.icon = objectService.getIcon(self.ob);
        if (self.xob) {
            serverCallService.getOne(self.xob, self.xid).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {

                        self.linkedbean = response.data.json;
                    } else {
                        self.linkedbean = null;
                    }
                } else {
                    self.linkedbean = null;
                }
            }).catch(function (data) {
                self.linkedbean = null;
            });
        }
    }

}
