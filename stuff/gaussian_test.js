
function do_tests(test_count, toss_count, test_func) {
  var min = Infinity;
  var max = -Infinity;
  var avg = 0;

  var t0 = performance.now();
  for (var i = 0; i < test_count; i++) {
    var heads = test_func(toss_count);
    if (heads > max) { max = heads }
    if (heads < min) { min = heads }
    avg += heads;
  }
    avg /= test_count;
  var t1 = performance.now();

  console.log('Elapsed time: ' + (t1 - t0).toFixed(3) + ' ms');
  console.log('Minimum: ' + min);
  console.log('Maximum: ' + max);
  console.log('Average: ' + avg);
}


var gaussian_straight_test = function(toss_count) {
  var acc = 0;
  for (var i = 0; i < toss_count ; i++) {
    if (Math.random() < 0.5) { acc += 1; }
  }
  return acc;
}

var gaussian_bm_test = function(toss_count) {
  return gaussian_random((toss_count / 2), (toss_count / 4));
}

function gaussian_random(mean, variance) {
  var s;
  var x;
  var y;
  do {
    x = Math.random() * 2.0 - 1.0;
    y = Math.random() * 2.0 - 1.0;
    s = Math.pow(x, 2) + Math.pow(y, 2);
  } while ( (s > 1) || (s == 0) );

  var gaussian = x * Math.sqrt(-2*Math.log(s)/s);
  return mean + gaussian * Math.sqrt(variance);
}


// Launch of tests:
var test_count = 10000;
var toss_count = 1000;
console.log("\nToss " + toss_count + " coins, " + test_count + " times");
console.log("Straight method: ");
do_tests(test_count, toss_count, gaussian_straight_test);
console.log("Box-Muller method: ");
do_tests(test_count, toss_count, gaussian_bm_test);


var test_count = 10000;
var toss_count = 10;
console.log("\nToss " + toss_count + " coins, " + test_count + " times");
console.log("Straight method: ");
do_tests(test_count, toss_count, gaussian_straight_test);
console.log("Box-Muller method: ");
do_tests(test_count, toss_count, gaussian_bm_test);
