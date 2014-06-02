var async = require("async"),
	urlglob = require("urlglob");
module.exports = function(c, l) {
	var e, f, g, m = function(h) {
			var b = [],
				d;
			for (d in c[f][g].sync) {
				var a = c[f][g].sync[d].split("."),
					k = new l[a[0]](e);
				b.push(k[a[1]]);
			}
			async.waterfall(b, function(a, b) {
				h(a, b);
			});
		}, n = function(h) {
			var b = {}, d;
			for (d in c[f][g].async) {
				var a = c[f][g].async[d].split("."),
					k = new l[a[0]](e);
				b[d] = k[a[1]];
			}
			async.parallel(b, function(a, b) {
				h(a, b);
			});
		}, p = function(c, b, d) {
			c = null;
			for (var a in b) {
				if (urlglob(a, e.url)) {
					c = a;
					break;
				}
			}
			d(c);
		};
	this.run = function(h, b) {
		e = h;
		e.method in c || "*" in c ? (f = e.method in c ? e.method : "*", p(e.url, c[f], function(d) {
			if (null === d) {
				b(!0, null);
			} else {
				var a = {};
				g = d;
				"undefined" != typeof c[f][g].sync && (a.sync = m);
				"undefined" != typeof c[f][g].async && (a.async = n);
				async.parallel(a, b);
			}
		})) : b(!0, null);
	};
};
