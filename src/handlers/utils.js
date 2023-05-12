exports.generateOrderId = ()=>{
    var date = new Date();
    var components = [
      "#PS",
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ];
    return components.join("");
}

exports.checker = (arr, target) => target.every(v => arr.includes(v));