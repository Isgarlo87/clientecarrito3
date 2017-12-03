moduloDirectivas.component('foreignKey', {
    templateUrl: "js/system/component/foreignkey/foreignkey.html",
    controllerAs: 'fk',
    controller: foreignkeyController1,
    bindings: {
        "bean": "=",
        "form": "=",
        "name": "<",
        "reference": "<",
        "profile": "<",
        "required": "<"
    }
});
// $postLink $onInit  $onChanges  $onDestroy
function foreignkeyController1(toolService, serverCallService, $uibModal) {
    var self = this;
    //-----
    self.chooseOne = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/app/' + self.reference + '/' + self.profile + '/selection.html',
            controller: toolService.capitalizeWord(self.reference) + "Selection" + self.profile + "Controller",
            size: 'lg'
        }).result.then(function (modalResult) {
            self.bean.id = modalResult;
            self.change_value();
        });
    };
    //-----
    self.change_value = function () {
        old_id = parseInt(self.bean.id);
        if (old_id) {
            serverCallService.getOne(self.reference, old_id).then(function (response) {
                self.bean = response.data.json.data;
                if (self.bean) {
                    if (response.data.json.data.id > 0) {
                        validity(true);
                        self.desc = "";
                        response.data.json.metaProperties.forEach(function (arrayItem) {
                            if (arrayItem.IsForeignKeyDescriptor) {
                                self.desc += self.bean[arrayItem.Name] + " ";
                            }
                        })
                        self.desc = self.desc.trim();
                    } else {
                        validity(false);
                        self.desc = "";
                    }
                } else {
                    validity(false);
                    self.desc = "";
                }
            }).catch(function (data) {
                validity(false);
                self.desc = "";
            });
        } else {
            validity(false);
            self.desc = "";
        }
    };
    //-----
    var validity = function (isValid) {
        if (self.form[self.name]) {
            self.form[self.name].$setValidity('exists', isValid);
        }
    };
    //-----
    this.$onInit = function () {
        self.change_value();
    }
}


