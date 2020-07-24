import { __awaiter, __generator } from 'tslib';
import { useState, useEffect } from 'react';
var useNorris = function(initialState) {
  var _a = useState(initialState),
    norris = _a[0],
    setNorris = _a[1];
  var _b = useState(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = useState(null),
    error = _c[0],
    setError = _c[1];
  useEffect(function() {
    var fetchNorris = function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var res, json, error_1;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 4, , 5]);
              return [
                4 /*yield*/,
                fetch('https://api.chucknorris.io/jokes/random'),
              ];
            case 2:
              res = _a.sent();
              return [4 /*yield*/, res.json()];
            case 3:
              json = _a.sent();
              setNorris(json);
              setIsLoading(false);
              return [3 /*break*/, 5];
            case 4:
              error_1 = _a.sent();
              setError(error_1);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    };
    fetchNorris();
  }, []);
  return { norris: norris, isLoading: isLoading, error: error };
};
export default useNorris;
//# sourceMappingURL=index.js.map
