$(function () {
  var localStorageKey = 'api-proxy-store';
  var dataObj = getData(localStorageKey);
  var tableBox = $('.table-content');
  var saveBtn = $('.saveBtn');

  if (!dataObj) dataObj = {};
  renderTable(dataObj, tableBox);

  saveBtn.click(function () {
    var origin = $('.origin-request').val();
    var target = $('.target-text-content').val();
    // 增加数据并存储
    dataObj[origin] = target;
    setData(localStorageKey, dataObj);
    $('#myModal').modal('hide');
    renderTable(dataObj, tableBox);
  })

  tableBox.click(function (event) {
    var targetClassList = event.target.classList;
    if (targetClassList.contains('edit')) {
      var origin = $(event.target).data('key');
      var target = dataObj[$(event.target).data('key')];

      $('.origin-request').val(origin);
      $('.target-text-content').val(target);
      $('#myModal').modal('show');
    } else if (targetClassList.contains('delete')) {
      var origin = $(event.target).data('key');

      delete dataObj[origin];
      setData(localStorageKey, dataObj);
      renderTable(dataObj, tableBox);
    }
    
    event.target.classList.contains('edit')
  })

  function renderTable (items, box) {
    var htmlTpl = [];

    Object.keys(items).forEach(function (item) {
      htmlTpl.push('<tr>');
      htmlTpl.push('<td><p class="one-line" title="'+ item +'">' + item + '</p></td>');
      htmlTpl.push('<td><p class="one-line" title="'+ items[item] +'">' + items[item] + '</p></td>');
      htmlTpl.push('<td><p data-key="' + item + '" class="glyphicon glyphicon-pencil deal-icon edit"></p></td>');
      htmlTpl.push('<td><p data-key="' + item + '" class="glyphicon glyphicon-remove deal-icon delete"></p></td>');
      htmlTpl.push('</tr>');
    })

    box.html(htmlTpl.join(''));
  }

  function addNewInfo (origin, target) {
    dataObj[origin] = target;
    setData(localStorageKey, dataObj);
  }

  function getData (key) {
    var data = window.localStorage.getItem(key);
    if (data) return JSON.parse(window.localStorage.getItem(key));
    return null
  }

  function setData (key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
});
