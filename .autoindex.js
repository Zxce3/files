(function () {
    var nginx = {
        getFirstElement: function (str) {
            let element = document.createElement("DIV");
            element.innerHTML = str;
            if (!element.firstChild) return ''
            element.firstChild.title = element.firstChild.innerText;
            return element.firstChild.outerHTML;
        },
        getDate: function (str) {
            // Match date format '07-Oct-2021 20:11'
            let matched = str.match(/[0-9]{2}-[A-Z][a-z]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}/)
            return matched ? matched[0] : '';
        },
        getSize: function (str) {
            let strSplitted = str.split(' ');
            let size = strSplitted[strSplitted.length - 1].match(/[0-9].+/);
            return size ? this.parseSize(size[0]) : '';
        },
        parseSize: function (strSize) {
            if (!strSize) return null;
            let calculate = (size, index = 0) => {
                if (size < 900) return [size, index]
                return calculate(parseFloat(size / 1024).toFixed(2), ++index);
            }
            let metrics = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
            let [size, index] = calculate(parseInt(strSize));
            return [size, metrics[index]].join(' ');
        },
        removeExtraSpaces: function (str) {
            return str.replace(/\s+/g, ' ');
        },
        init: function () {
            if (!document.querySelector) return;
            var nginxList = document.querySelector('body>pre');
            if (!nginxList) return;

            //transform link elements to li and add classNames
            var htmlLines = nginxList.innerHTML.split('\n');
            let html = [];
            htmlLines.forEach(line => {
                line = this.removeExtraSpaces(line);
                let anchorElement = this.getFirstElement(line);
                let date = this.getDate(line);
                let size = this.getSize(line);
                if (anchorElement) {
                    html.push(`<tbody><tr><td class="text-wrap">${anchorElement}</td><td class="date">${date}</td><td class="size">${size}</td></tr></tbody>`);
                }

            })
            html[0] = `<a class="m-5 btn " href="../">..</a>  <input type="text" class="table-filter form-control" data-table="order-table" placeholder="Item to filter.." />`
            html.unshift('<table class="table order-table table-striped"><thead><tr><th>Name</th><th>Date</th><th>Size</th></tr></thead>');
            html.push('</table>');
            nginxList.innerHTML = html.join('');
        }
    };
    nginx.init();
var TableFilter = (function() {
 var Arr = Array.prototype;
        var input;
  
        function onInputEvent(e) {
            input = e.target;
            var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
            Arr.forEach.call(table1, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                    Arr.forEach.call(tbody.rows, filter);
                });
            });
        }

        function filter(row) {
            var text = row.textContent.toLowerCase();
       //console.log(text);
      var val = input.value.toLowerCase();
      //console.log(val);
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
            init: function() {
                var inputs = document.getElementsByClassName('table-filter');
                Arr.forEach.call(inputs, function(input) {
                    input.oninput = onInputEvent;
                });
            }
        };
 
    })();

  /*console.log(document.readyState);
    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
      console.log(document.readyState);
            TableFilter.init();
        }
    }); */
  
 TableFilter.init(); 
}());