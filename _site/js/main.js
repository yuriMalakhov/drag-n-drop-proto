// Generated by CoffeeScript 1.8.0
angular.module('app', ['angularFileUpload', 'ng-sortable']).config([
  '$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    return $interpolateProvider.endSymbol(']]');
  }
]).controller('CreativesController', [
  '$scope', '$upload', function($scope, $upload) {
    var processItem, strings;
    $scope.activeTab = "images";
    $scope.imageResults = [];
    $scope.headlineResults = [];
    $scope.textResults = [];
    $scope.files = [];
    $scope.readyAds = [];
    $scope.images = ['img/image1.jpeg', 'img/image2.jpeg', 'img/image3.jpeg', 'img/image4.jpeg'];
    $scope.headers = ['Header header header header', 'You can drop here a text file with ";" as separator', 'Or you can Drag here selected text from any text editors (strings should be separated with ; or start by new line)'];
    $scope.texts = ['Text text text text text', 'You can drop here a text file with ";" as separator', 'Or you can Drag here selected text from any text editors (strings should be separated with ; or start by new line)'];
    $scope.imagesSortable = {
      group: {
        name: 'imagesSortable',
        pull: 'clone',
        put: true
      },
      ghostClass: "creatives_image-drag-ghost",
      animation: 150
    };
    strings = {
      group: {
        name: 'headlineStrings',
        pull: 'clone',
        put: true
      },
      handle: ".creatives_string-drag-handle",
      ghostClass: "creatives_string-drag-ghost",
      animation: 150
    };
    $scope.headlineStrings = angular.extend({}, strings);
    $scope.textStrings = angular.extend({}, strings, {
      group: {
        name: 'textStrings',
        pull: 'clone',
        put: true
      }
    });
    $scope.imagesSortableTarget = {
      group: {
        name: 'imagesSortableTarget',
        put: ['imagesSortable'],
        pull: false
      }
    };
    $scope.headlineStringsTarget = {
      group: {
        name: 'headlineStringsTarget',
        put: ['headlineStrings'],
        pull: false
      }
    };
    $scope.textStringsTarget = {
      group: {
        name: 'textStringsTarget',
        put: ['textStrings'],
        pull: false
      }
    };
    $scope.constructed = {
      image: "",
      headline: "",
      text: ""
    };
    processItem = function(name, newVal, oldVal) {
      if (angular.equals(newVal, oldVal)) {
        return;
      }
      return angular.forEach(newVal, function(val) {
        if (oldVal.indexOf(val) === -1) {
          $scope.constructed[name] = val;
          if ($scope.constructed[name]) {
            return $scope[name + 'Results'] = [$scope.constructed[name]];
          }
        }
      });
    };
    $scope.$watch('headlineResults', function(newVal, oldVal) {
      return processItem('headline', newVal, oldVal);
    }, true);
    $scope.$watch('textResults', function(newVal, oldVal) {
      return processItem('text', newVal, oldVal);
    }, true);
    $scope.$watch('imageResults', function(newVal, oldVal) {
      return processItem('image', newVal, oldVal);
    }, true);
    $scope.$watch('constructed', function(newVal, oldVal) {
      if (angular.equals(newVal, oldVal)) {
        return;
      }
      if (newVal.image && newVal.headline && newVal.text) {
        $scope.readyAds.unshift(angular.extend({}, newVal));
        return console.log("New res ad constructed: ", newVal);
      }
    }, true);
    return $scope.$watch('files', function(newVal, oldVal) {
      if (angular.equals(newVal, oldVal)) {
        return;
      }
      return $scope.$broadcast("processFiles", newVal);
    }, true);
  }
]).directive('imgCenter', function() {
  return {
    scope: {
      imgCenter: '=',
      height: "=",
      width: "="
    },
    restrict: 'A',
    link: function(scope, elm, attrs) {
      return scope.$watch('imgCenter', function(newVal, oldVal) {
        var image;
        if (angular.isUndefined(newVal) && angular.equals(newVal, oldVal)) {
          return;
        }
        image = new Image();
        if (scope.imgCenter) {
          image.src = scope.imgCenter;
        }
        elm.empty();
        return image.onload = function() {
          var height, width;
          width = this.width;
          height = this.height;
          elm.css({
            position: "relative"
          });
          jQuery(image).addClass(attrs["class"]);
          if (width / height > 1) {
            jQuery(image).css({
              "position": "absolute",
              "height": "auto",
              "width": "" + scope.width + "px",
              "margin-top": -height * scope.width / width / 2 + "px",
              "top": "50%",
              "left": "0"
            });
          } else {
            jQuery(image).css({
              "position": "absolute",
              "height": "" + scope.height + "px",
              "width": "auto",
              "margin-left": -width * scope.height / height / 2 + "px",
              "left": "50%",
              "top": "0"
            });
          }
          return jQuery(image).appendTo(elm);
        };
      }, true);
    }
  };
}).directive('imgCenter2', function() {
  return {
    restrict: 'A',
    link: function(scope, elm) {
      console.log("imgCenter directive: ", arguments);
      return elm.load(function() {
        var height, width;
        width = this.naturalWidth;
        height = this.naturalHeight;
        elm.parent().css({
          position: "relative"
        });
        if (width / height > 1) {
          return elm.css({
            "position": "absolute",
            "height": "auto",
            "width": "" + (elm.parent().width()) + "px",
            "margin-top": -height * elm.parent().width() / width / 2 + "px",
            "top": "50%",
            "left": "0"
          });
        } else {
          return elm.css({
            "position": "absolute",
            "height": "" + (elm.parent().height()) + "px",
            "width": "auto",
            "margin-left": -width * elm.parent().height() / height / 2 + "px",
            "left": "50%",
            "top": "0"
          });
        }
      });
    }
  };
}).directive('processFiles', function() {
  return {
    restrict: 'A',
    link: function(scope, elm) {
      return scope.$on("processFiles", function(e, files) {
        console.log("Should process these files: ", files);
        return angular.forEach(files, function(file) {
          var imageType, reader, textType;
          imageType = /image.*/;
          textType = /text.*/;
          reader = new FileReader();
          if (file.type.match(imageType)) {
            reader.onload = function(e) {
              scope.$apply(function() {
                return scope[scope.activeTab].push(e.target.result);
              });
              return console.info("Result of upload: ", scope[scope.activeTab]);
            };
            reader.readAsDataURL(file);
          }
          if (file.type.match(textType)) {
            reader.onload = function(e) {
              var text;
              text = e.target.result;
              return scope[scope.activeTab] = text.split(";");
            };
            return reader.readAsText(file);
          }
        });
      });
    }
  };
}).directive('stringAdd', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      scope.keyPress = function(name, string, e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          scope[name.slice(0, -1)] = void 0;
          if (string && string.indexOf(";")) {
            return scope[name] = scope[name].concat(string.split(";"));
          } else {
            return scope[name] = scope[name].concat(string.split("\n"));
          }
        }
      };
      return scope.onBlur = function(item, e) {};
    }
  };
});
