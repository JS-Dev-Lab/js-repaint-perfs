(function () {
	'use strict'
	var el = frzr.el;
	var mount = frzr.mount;
	var List = frzr.List;

	function Table () {
		this.el = el('div', null,
			el('table', { className: 'table table-striped latest-data' },
				el('tbody',
					this.rows = new List(Row)
				)
			)
		);
	}

	Table.prototype.update = function (data) {
		this.rows.update(data);
	}

	function Cell (initData, data, index) {
		if (index === 0) {
			this.el = el('td', { className: 'dbname' });
		} else if (index === 1) {
			this.el = el('td', { className: 'query-count' },
				this.count = el('span')
			);
		} else {
			this.el = el('td',
				this.span = el('span'),
				el('div', { className: 'popover left' },
					this.popover = el('div', { className: 'popover-content' }),
					el('div', { className: 'arrow' }, '')
				)
			);
		}
	}

	Cell.prototype.update = function (data, index) {
		if (index === 0) {
			this.el.textContent = data;
		} else if (index === 1) {
			this.count.textContent = data[0];
			this.count.className = data[1];
		} else {
			this.el.className = data.elapsedClassName;
			this.span.textContent = data.formatElapsed;
			this.popover.textContent = data.query;
		}
	}

	function Row () {
		this.el = el('tr',
			this.cells = new List(Cell)
		);
	}

	Row.prototype.update = function(db) {
		this.cells.update(
			[
				db.dbname,
				[ db.lastSample.nbQueries, db.lastSample.countClassName ]
			].concat(db.lastSample.topFiveQueries)
		);
	}

	var table = new Table();

	update();
	mount(document.getElementById('app'), table);

	function update () {
		var data = ENV.generateData().toArray();

		Monitoring.renderRate.ping();

		table.update(data);

		setTimeout(function () {
			update();
		}, ENV.timeout);
	}
})()
