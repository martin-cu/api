function similar(a,b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	var d = b.toLowerCase().split(/[^A-Za-z]/);
    var lengthA = a.length;
    var lengthB = b.length;
    var equivalency1 = 0;
    var equivalency2 = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency1++;
        }
        for (var x = 0; x < d.length; x++) {
        	if (d[x][i] == a[i]) {
        		equivalency2++;
        	}
        }
    }
    if (equivalency2 > equivalency1);
    	equivalency1 = equivalency2;

    var weight = equivalency1 / maxLength;
    return (weight * 100);
}

function create_modal(target, tables, action, method) {
	window.tables = tables;
	window.modal_form_action = action;
	window.modal_form_method = method;
	if (!document.getElementById(target)) {
		window.modal_id = target +' ';
		var div = document.createElement('div');
		div.setAttribute('class', 'modal');
		div.setAttribute('tabindex', '-1');
		div.setAttribute('role', 'dialog');
		div.setAttribute('id', target);
		div.setAttribute('aria-hidden', 'true');
		div.setAttribute('data-backdrop', 'static');
		div.setAttribute('data-keyboard', 'false');
		var dialog = document.createElement('div');
		dialog.setAttribute('class', 'modal-dialog-lg modal-dialog-centered');
		dialog.setAttribute('role', 'document');
		var content = document.createElement('div');
		content.setAttribute('class', 'modal-content shadow');

		var body = document.createElement('div');
		body.setAttribute('class', 'modal-body');

		body.appendChild(create_header());
		body.appendChild(create_label());
		body.appendChild(create_body());

		content.appendChild(body);
		content.appendChild(create_footer());
		dialog.appendChild(content);
		div.appendChild(dialog);

		var body = document.getElementsByTagName('body')[0];
		body.appendChild(div);

		$(document).ready(function() {
			window.cur_step = 2;
			$('#'+modal_id+' .import-file-container > input').change(function() {
				var fileName = '';
				var label = document.querySelector('#'+modal_id+'.import-file-container > .vig-file-path')
				fileName = $(this).val();
				fileName = fileName.split('fakepath\\');
				label.innerHTML = fileName[1];
				validate_step(cur_step);
			});
			window.select = get_columns();
		});

	}
	$(target).modal('show');
}

function create_icon(cont, icon, label) {
	var step_icon = document.createElement('span');
	step_icon.setAttribute('class', 'material-icons-outlined circle mr-2');
	step_icon.innerHTML = icon;
	var step_label = document.createElement('span');
	step_label.setAttribute('class', 'step-label');
	step_label.innerHTML = label;
	cont.appendChild(step_icon);
	cont.appendChild(step_label);
	return cont;
}

function create_header() {
	var modal_head = document.createElement('div');
	modal_head.setAttribute('class', 'modal-head');
	var steps_head = document.createElement('div');
	steps_head.setAttribute('class', 'step-header');

	var steps = document.createElement('div');
	steps.setAttribute('class', 'current step');
	steps = create_icon(steps, 'fiber_manual_record', 'Destination Table');
	steps_head.appendChild(steps);

	var dash = document.createElement('span');
	dash.setAttribute('class', 'material-icons divider mx-3');
	dash.innerHTML = 'remove';
	steps_head.appendChild(dash);

	var steps = document.createElement('div');
	steps.setAttribute('class', 'step');
	steps = create_icon(steps, 'fiber_manual_record', 'Import Settings');
	steps_head.appendChild(steps);

	var dash = document.createElement('span');
	dash.setAttribute('class', 'material-icons divider mx-3');
	dash.innerHTML = 'remove';
	steps_head.appendChild(dash);

	var steps = document.createElement('div');
	steps.setAttribute('class', 'step');
	steps = create_icon(steps, 'fiber_manual_record', 'Review Configuration');
	steps_head.appendChild(steps);

	var btn_close = document.createElement('button');
	btn_close.setAttribute('class', 'btn-transparent');
	btn_close.setAttribute('type', 'button');
	btn_close.setAttribute('data-dismiss', 'modal');
	btn_close.setAttribute('onclick', 'remove_modal()');
	var btn_span = document.createElement('span');
	btn_span.setAttribute('class', 'material-icons close');
	btn_span.innerHTML = 'close';

	btn_close.appendChild(btn_span);
	modal_head.appendChild(steps_head);
	modal_head.appendChild(btn_close);
	return modal_head;
}

function create_label() {
	var div = document.createElement('div');
	div.setAttribute('class', 'progress-label');
	var span = document.createElement('span');
	span.setAttribute('class', 'h5');
	span.innerHTML = "Okay. Let's get started by defining the target table";
	var span1 = document.createElement('span');
	span1.setAttribute('class', 'mt-2');
	span1.innerHTML = 'Available tables will be shown based from the current database';

	div.appendChild(span);
	div.appendChild(span1);
	return div;
}

function create_file_container() {
	var file_container = document.createElement('div');
	file_container.setAttribute('class', 'import-file-container');
	var span = document.createElement('span');
	span.innerHTML = 'File path:';
	var path_label = document.createElement('label');
	path_label.setAttribute('class', 'vig-file-path');
	var file_input = document.createElement('input');
	file_input.setAttribute('type', 'file');
	file_input.setAttribute('class', 'vig-input-file');
	file_input.setAttribute('id', 'import_file');
	var input_label = document.createElement('label');
	input_label.setAttribute('class', 'file-label');
	input_label.setAttribute('for', 'import_file');
	input_label.innerHTML = 'Browse';

	file_container.appendChild(span);
	file_container.appendChild(path_label);
	file_container.appendChild(file_input);
	file_container.appendChild(input_label);
	return file_container;
}

function existing_table_opt(cont) {
	var radio_field = document.createElement('div');
	radio_field.setAttribute('class', 'radio-field');
	var label = document.createElement('label');
	label.setAttribute('class', 'radio-label');
	var radio = document.createElement('input');
	radio.setAttribute('class', 'radio-circle');
	radio.setAttribute('type', 'radio');
	radio.setAttribute('name', 'import_option');
	radio.setAttribute('value', 'existing');
	radio.setAttribute('checked', true);
	var input_label = document.createElement('span');
	input_label.setAttribute('class', 'radio-opt');
	input_label.innerHTML = 'Use existing table';

	label.appendChild(radio);
	label.appendChild(input_label);
	radio_field.appendChild(label);

	var import_container = document.createElement('div');
	import_container.setAttribute('class', 'import_container');
	var wrapper = document.createElement('div');
	wrapper.setAttribute('class', 'select-wrapper');

	wrapper = get_existing_tables(wrapper);
	import_container.appendChild(wrapper);

	cont.appendChild(radio_field);
	cont.appendChild(import_container);

	return cont;
}

function get_existing_tables(wrapper) {
	var select = document.createElement('select');
	select.setAttribute('class', 'd-block db-select');
	for (var i = 0; i < tables.length; i++) {
		var opt = document.createElement('option');
		opt.setAttribute('value', tables[i].table_name);
		opt.innerHTML = tables[i].table_name;
		select.appendChild(opt);
	}
	var span = document.createElement('span');
	span.setAttribute('class', 'material-icons select-icon');
	span.innerHTML = 'play_arrow';

	wrapper.appendChild(select);
	wrapper.appendChild(span);
	return wrapper;
}

function create_import_opt(cont) {
	cont.appendChild(create_file_container());

	var options = document.createElement('div');
	options.setAttribute('class', 'radio-span');
	options = existing_table_opt(options);

	cont.appendChild(options);

	return cont;
}

function create_body() {
	var div_body = document.createElement('div');
	div_body.setAttribute('class', 'progress-body');
	var import_opt = document.createElement('div');
	import_opt.setAttribute('class', 'file-options');

	create_import_opt(import_opt);

	div_body.appendChild(import_opt);

	return div_body;
}

function create_footer() {
	var id = modal_id + ' ';
	var div = document.createElement('div');
	div.setAttribute('class', 'dialog-footer border-top');
	var btn1 = document.createElement('button');
	btn1.setAttribute('class', 'button-vig md tertiary mx-2');
	btn1.setAttribute('type', 'button');
	btn1.setAttribute('onclick', 'remove_modal()');
	btn1.setAttribute('data-dismiss', 'modal');
	btn1.innerHTML = 'Close';
	var btn2 = document.createElement('button');
	btn2.setAttribute('class', 'button-vig md disabled');
	btn2.setAttribute('type', 'button');
	btn2.setAttribute('id', 'btnSubmit');
	btn2.setAttribute('onclick', 'view_import_step(2)');
	btn2.innerHTML = 'Continue';
	div.appendChild(btn1);
	div.appendChild(btn2);
	return div;
}

function remove_modal() {
	$('#'+modal_id).remove();
	$('.modal-backdrop').remove();
}

function toggle_all_checkbox(target) {
	var master = $(target).next()
	var str;
	var checked = $(target).prop('checked');
	if (!checked) {
		str = 'check_box_outline_blank';
		toggle_btn_disable(0);
	}
	else {
		str = 'check_box';
	}
	var input = $('#'+modal_id+' .import-table-settings input:checkbox').prop('checked', checked);
	var checks = $('#'+modal_id+' .import-table-settings input:checkbox').next().html(str);

	if (str === 'check_box') {
		var columns = $('#'+modal_id+' .import-table-settings .checkbox-input:input:checked');
		var valid = true;
		for (var i = 0; i < columns.length; i++) {
			var td = $(columns[i]).parent().parent();
			var val = td.next().next().children().children('option:selected').val();
			if (val === '...' || val === undefined)
				valid = false;
		}
		if (valid)
			toggle_btn_disable(1);
		else
			toggle_btn_disable(0);
	}
}

function toggle_import_checkbox(target) {
	var box = $(target).next();
	var status = false;
	var boxes = $('#'+modal_id+' .import-table-settings input:checkbox:not(:first)');
	var str;

	if (box.html() == 'check_box')
		str = 'check_box_outline_blank';
	else
		str = 'check_box';
	$(box).html(str);

	for (var i = 0; i < boxes.length; i++) {
		if ($(boxes[i]).next().html() === 'check_box_outline_blank')
			status = true;
	}

	if (status) {
		str = 'check_box_outline_blank';
		$('#'+modal_id+' .import-table-settings input:checkbox:first').prop('checked', false);
	}
	else
		str = 'check_box';

	$('#'+modal_id+' .import-table-settings input:checkbox:first').next().html(str);

	
	var columns = $('#'+modal_id+' .import-table-settings .checkbox-input:input:checked');
	if (columns.length > 0) {
		var valid = true;
		for (var i = 0; i < columns.length; i++) {
			var td = $(columns[i]).parent().parent();
			var val = td.next().next().children().children('option:selected').val();
			if (val === '...' || val === undefined)
				valid = false;
		}
		if (valid)
			toggle_btn_disable(1);
		else
			toggle_btn_disable(0);
	}
	else
		toggle_btn_disable(0);
}

function progress_head(step) {
	var step_header = document.querySelectorAll('#'+modal_id+'.modal-head > .step-header > .current');
	var circle = document.querySelectorAll('#'+modal_id+'.modal-head > .step-header > .step');
	$(step_header).removeClass('current');
	for (var i = 0; i < circle.length; i++) {
		if (circle[i].children[0].innerHTML === 'check_circle_outline') {
			circle[i].children[0].innerHTML = 'fiber_manual_record';
		}
		circle[i].children[0].classList.remove('small-circle');
		circle[i].children[0].classList.add('circle');
	}
	for (var i = 0; i < step-1; i++) {
		circle[i].children[0].classList.remove('circle');
		circle[i].children[0].classList.add('small-circle');
		circle[i].children[0].innerHTML = 'check_circle_outline';
	}
	if (step == 1)
		var currStep = document.querySelector('#'+modal_id+'.modal-head').children[0].children[0];
	else if (step == 2)
		var currStep = document.querySelector('#'+modal_id+'.modal-head').children[0].children[2];
	else if (step == 3)
		var currStep = document.querySelector('#'+modal_id+'.modal-head').children[0].children[4];
	
	currStep.classList.add('current');
}

function progress_label(step) {
	var lbl1 = document.querySelector('#'+modal_id+'.progress-label').children[0];
	var lbl2 = document.querySelector('#'+modal_id+'.progress-label').children[1];
	if (step == 1) {
		lbl1.innerHTML = "Okay. Let's get started by defining the target table";
		lbl2.innerHTML = 'Available tables will be shown based from the current database';
	}
	else if (step == 2) {
		lbl1.innerHTML = "We're almost there";
		lbl2.innerHTML = 'Match the table columns to the respective column';
	}
	else if (step == 3) {
		lbl1.innerHTML = 'Well done. You made it!';
		lbl2.innerHTML = 'Import status will be shown below';
	}
}

function progress_body(step) {
	var body = document.querySelectorAll('#'+modal_id+'.progress-body');
	if (step == 1) {
		for (var i = 1; i < body.length; i++) 
			body[i].remove();
		body[0].classList.remove('hide');
	}
	else if (step == 2) {
		if (body.length === 3) {
			body[1].classList.remove('hide');
			body[2].remove();
		}
		else {
			body[0].classList.add('hide');
			create_import_config(file_type);
			var table = document.querySelector('#'+modal_id+'.progress-body select').value;
			create_import_columns(select, table, headers);

			$(document).ready(function() {
				$('#'+modal_id+' .import-table-settings select').change(function() {
					var checkbox = $(this).parent().parent();
					checkbox = $(checkbox).children().first().children().children().first().prop('checked');
					if (checkbox) {
						toggle_btn_disable(1);
					}
				});
				$('#'+modal_id+' .import-table-settings .checkbox-input:input:checkbox').click(function() {
					toggle_import_checkbox(this);
				});
				$('#'+modal_id+' .import-table-settings .checkbox-input-master:input:checkbox').click(function() {
					toggle_all_checkbox(this);
				});
			});
		}
	}
	else if (step == 3) {
		var data = consolidate_data();
		for (var i = 0; i < body.length; i++) {
			body[i].classList.add('hide');
		}
		var json = finalProccessExcel(file_data, data[1], data[0]);
		create_setting_review(data);
		create_import_form(json, modal_form_action, modal_form_method);

	}
}

function create_import_form(val, action, method) {
	var form_id = modal_id.slice(0, -1) + '_form';
	var form = document.createElement('form');

	if (method.toLowerCase() === 'get') {
		action +='/'+btoa(val);
	}
	else {
		var settings = document.createElement('input');
		var data = document.createElement('input');
		data.setAttribute('type', 'hidden');
		data.setAttribute('id', modal_id+'_data');
		data.setAttribute('value', val);

		form.appendChild(data);
	}
	form.setAttribute('action', action);
	form.setAttribute('method', method);
	form.setAttribute('id', form_id);

	$('#'+modal_id+' .modal-body').children().last().append(form);
}

function create_setting_review(data) {
	var table_headers = {
		data_src: 'Data Source', dest: 'Destination Column'
	}
	var setting_headers = {
		opt_name: 'Option', val: 'Value'
	}
	var div = document.createElement('div');
	div.setAttribute('class', 'progress-body');
	var container_div = document.createElement('div');
	var container_div1 = document.createElement('div');
	var label = document.createElement('label');
	label.setAttribute('class', 'review_label');
	label.innerHTML = 'Data Values';
	var label1 = document.createElement('label');
	label1.setAttribute('class', 'review_label');
	label1.innerHTML = 'Import Settings';

	container_div.appendChild(label);
	container_div1.appendChild(label1);

	var container = document.createElement('div');
	container.setAttribute('class', 'review_container');
	var table_container = document.createElement('div');
	table_container.setAttribute('class', 'table_container');
	var table = document.createElement('table');
	table.setAttribute('class', 'mdc-data-table__table overflow-auto');
	var th = create_review_data(table_headers, 'th', 'columns');
	table.appendChild(th);
	for (var i = 0; i < data[1].length; i++) {
		var td = create_review_data(data[1][i], 'td', 'columns');
		table.appendChild(td);
	}
	table_container1 = document.createElement('div');
	table_container1.setAttribute('class', 'table_container');
	var options = document.createElement('table');
	options.setAttribute('class', 'mdc-data-table__table overflow-auto', 'options');
	var th = create_review_data(setting_headers, 'th');
	options.appendChild(th);
	for (var i = 0; i < data[0].length; i++) {
		var td = create_review_data(data[0][i], 'td', 'options');
		options.appendChild(td);
	}
	table_container.appendChild(table);
	table_container1.appendChild(options);
	container_div.appendChild(table_container);
	container_div1.appendChild(table_container1);
	container.appendChild(container_div);
	container.appendChild(container_div1);
	div.appendChild(container);

	$('#'+modal_id+' .modal-body').append(div);
}

function create_review_data(data, opt, data_set) {
	var tr = document.createElement('tr');
	var th = document.createElement('td');
	var th1 = document.createElement('td');

	if (opt === 'th') {
		var tr_str = 'mdc-data-table__header-row';
		var th_str = 'mdc-data-table__header-cell';
	}
	else {
		var tr_str = 'mdc-data-table__row';
		var th_str = 'mdc-data-table__cell';
	}
	tr.setAttribute('class', tr_str);
	th.setAttribute('class', th_str);
	th1.setAttribute('class', th_str);
	if (data_set === 'columns') {
		th.innerHTML = data.data_src;
		th1.innerHTML = data.dest;
	}
	else {
		th.innerHTML = data.opt_name;
		th1.innerHTML = data.val;
	}
	tr.appendChild(th);
	tr.appendChild(th1);
	return tr;
}

function transform_xls_src(data) {
	for (var i = 0; i < data.length; i++) {
		for (var x = 0; x < headers.length; x++) {
			if (data[i].src === headers[x])
				data[i].src = x;
		}
	}
	return data;
}

function consolidate_data() {
	var dataArr = [];
	var opts = $('#'+modal_id+' .import-container-settings select');
	var columns = $('#'+modal_id+' .import-table-settings .checkbox-input:input:checked');
	var vals = [];
	var settings = [];
	for (var i = 0; i < columns.length; i++) {
		var td = $(columns[i]).parent().parent();
		if (td.next().next().children().children('option:selected').val() !== '...') {
			var data = {
				src: td.next().html(), dest: td.next().next().children().children('option:selected').val(),
				data_src: td.next().html()
			}
			vals.push(data);
		}
	}

	for (var i = 0; i < opts.length; i++) {
		var opt = {
			name: opts[i].name, val: opts[i].value, opt_name: $(opts[i]).prev().html()
		}
		settings.push(opt);
	}
	vals = transform_xls_src(vals);
	dataArr.push(settings);
	dataArr.push(vals);
	return dataArr;
}

function progress_footer(step) {
	var btn_target = "'"+modal_id+"'";
	var footer = document.querySelector('#'+modal_id+'.dialog-footer');
	for (var i = footer.childElementCount-1; i >= 0; i--) {
		$(footer.children[i]).remove();
	}
	var btn1 = document.createElement('button');
	btn1.setAttribute('class', 'button-vig md tertiary mx-2');
	btn1.setAttribute('type', 'button');
	var btn2 = document.createElement('button');
	btn2.setAttribute('class', 'button-vig md primary');
	btn2.setAttribute('type', 'button');
	if (step == 1) {
		btn1.setAttribute('data-dismiss', 'modal');
		btn1.setAttribute('onclick', '');
		btn1.innerHTML = 'Close';

		btn2.setAttribute('id', 'btnSubmit');
		btn2.setAttribute('onclick', 'view_import_step('+(cur_step+1)+')');
		btn2.innerHTML = 'Continue';
	}
	else if (step == 2) {
		btn1.setAttribute('onclick', 'view_import_step('+(cur_step-1)+')');
		btn1.innerHTML = 'Back';

		btn2.setAttribute('id', 'btnSubmit');
		btn2.setAttribute('onclick', 'view_import_step('+(cur_step+1)+')');
		btn2.innerHTML = 'Continue';

		var columns = $('#'+modal_id+' .import-table-settings .checkbox-input:input:checked');
		for (var i = 0; i < columns.length; i++) {
			var td = $(columns[i]).parent().parent();
			var val = td.next().next().children().children('option:selected').val();
			if (val === '...' || val === undefined)
				btn2.setAttribute('class', 'button-vig md disabled');
		}
	}
	else if (step == 3) {
		var form_id = modal_id.slice(0, -1) + '_form';
		btn1.setAttribute('onclick', 'view_import_step('+(cur_step-1)+')');
		btn1.innerHTML = 'Back';

		btn2.setAttribute('id', 'btnSubmit');
		btn2.setAttribute('type', 'submit');
		btn2.setAttribute('form', form_id);
		btn2.innerHTML = 'Submit';
	}
	footer.appendChild(btn1);
	footer.appendChild(btn2);
}

function view_import_step(step) {
	if (validate_step(step)) {
		cur_step = step;
		progress_head(step);
		progress_label(step);
		progress_body(step);
		progress_footer(step);
	}
}

function toggle_btn_disable(bool) {
	var btn = $('#'+modal_id+'.dialog-footer').children()[1];
	if (bool) {
		btn.classList.remove('disabled');
		btn.classList.add('primary');
	}
	else {
		btn.classList.remove('primary');
		btn.classList.add('disabled');
	}
}

function preview_file_data(headers, preview) {
	var container = document.createElement('div');
	container.setAttribute('class', 'preview-container');
	var div = document.createElement('div');
	div.setAttribute('class', 'import-preview');
	var label = document.createElement('label');
	label.setAttribute('class', 'review_label');
	label.innerHTML = 'Data Preview';
	var table = document.createElement('table');
	table.setAttribute('class', '');
	var tr_header = document.createElement('tr');
	for (var i = 0; i < headers.length; i++) {
		var th = document.createElement('th');
		th.innerHTML = headers[i];
		tr_header.appendChild(th);
	}
	table.appendChild(tr_header);
	for (var i = 0; i < preview.length; i++) {
		var tr_preview = document.createElement('tr');
		for (var x = 0; x < preview[i].length; x++) {
			var td = document.createElement('td');
			td.innerHTML = preview[i][x];
			tr_preview.appendChild(td);
		}
		table.appendChild(tr_preview);
	}
	div.appendChild(table);
	container.appendChild(label);
	container.appendChild(div);
	$('.progress-body > .file-options').append(container);
}

function validate_step(step) {
	var status = false;
	if (step < cur_step) {
		return true;
	}
	else {
		if (step == 2 || step == 1) {
			if ($('#'+modal_id+' #import_file').val() != '') {
				if (!$('#'+modal_id+' .preview-container').length)
					Upload();
				else {
					$('#'+modal_id+' .preview-container').remove();
					Upload();
				}

				status = true;
			}
		}
		else if (step == 3) {
			status = true;
			var columns = $('#'+modal_id+' .import-table-settings .checkbox-input:input:checked');
			for (var i = 0; i < columns.length; i++) {
				var td = $(columns[i]).parent().parent();
				var val = td.next().next().children().children('option:selected').val();
				if (val === '...' || val === undefined)
					status = false;
			}

		}
		else 
			status = true;

		if (status)
			toggle_btn_disable(1);
		else 
			toggle_btn_disable(0);

		return status;
	}
}

function toggle_import_settings() {
	$('.import-container-settings').toggleClass('hide');
}

function create_setting_options(label) {
	var opt = document.createElement('div');
	opt.setAttribute('class', 'opt');
	var opt_label = document.createElement('span');
	opt_label.innerHTML = label;
	opt.appendChild(opt_label);
	return opt;
}

function create_select_options(data) {
	var select = document.createElement('select');
	for (var i = 0; i < data.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = data[i];
		opt.setAttribute('value', data[i].toLowerCase());
		select.appendChild(opt);
	}
	return select;
}

function create_import_settings(type) {
	var div = document.createElement('div');
	div.setAttribute('class', 'import-container-settings hide');
	var span = document.createElement('span');
	span.setAttribute('class', 'h6');
	span.innerHTML = 'Options';

	div.appendChild(span);
	if (type === 'csv') {
		var opt = create_setting_options('Field separator');
		var field_separator = ['LF', 'CR', 'CR LF'];
		var select = create_select_options(field_separator);
		select.setAttribute('name', 'field_separator');
		opt.appendChild(select);
		div.appendChild(opt);

		var opt = create_setting_options('Line separator');
		var line_separator = [';', ':', '|', 'TAB', ','];
		var select = create_select_options(line_separator);
		select.setAttribute('name', 'line_separator');
		opt.appendChild(select);
		div.appendChild(opt);

		var opt = create_setting_options('NULL value as sql keyword');
		var sql_keyword = ['YES', 'NO'];
		var select = create_select_options(sql_keyword);
		select.setAttribute('name', 'sql_keyword');
		opt.appendChild(select);
		div.appendChild(opt);

		var opt = create_setting_options('Empty value as null sql keyword');
		var empty_as_null = ['YES', 'NO'];
		var select = create_select_options(empty_as_null);
		select.setAttribute('name', 'empty_as_null');
		opt.appendChild(select);
		div.appendChild(opt);
	}
	else if (type === 'xls' || type === 'xlsx') {
		var opt = create_setting_options('NULL value as sql keyword');
		var sql_keyword = ['YES', 'NO'];
		var select = create_select_options(sql_keyword);
		select.setAttribute('name', 'sql_keyword');
		opt.appendChild(select);
		div.appendChild(opt);

		var opt = create_setting_options('Empty value as null sql keyword');
		var empty_as_null = ['YES', 'NO'];
		var select = create_select_options(empty_as_null);
		select.setAttribute('name', 'empty_as_null');
		opt.appendChild(select);
		div.appendChild(opt);
	}
	return div;
}

function create_import_config(type) {
	var body = document.createElement('div');
	body.setAttribute('class', 'progress-body');
	var container = document.createElement('div');
	container.setAttribute('class', 'container');
	var config = document.createElement('div');
	config.setAttribute('class', 'import-configure');

	var flexbox = document.createElement('div');
	flexbox.setAttribute('class', 'd-flex');
	var span_head = document.createElement('span');
	span_head.innerHTML = 'Detected file format:';
	var span_data = document.createElement('span');
	span_data.setAttribute('class', 'ml-2 mr1');
	span_data.innerHTML = type;
	var setting_icon = document.createElement('span');
	setting_icon.setAttribute('class', 'material-icons import-setting');
	setting_icon.setAttribute('onclick', 'toggle_import_settings();');
	setting_icon.innerHTML = 'settings';
	flexbox.append(span_head);
	flexbox.append(span_data);
	flexbox.append(setting_icon);

	config.appendChild(flexbox);
	config.appendChild(create_import_settings(type));
	container.appendChild(config);
	body.appendChild(container);

	$('#'+modal_id+' .modal-body').append(body);
}

function create_th() {
	var tr = document.createElement('tr');
	var th = document.createElement('th');

	var lbl = document.createElement('label');
	lbl.setAttribute('class', 'vig-checkbox inline');
	var input = document.createElement('input');
	input.setAttribute('type', 'checkbox');
	input.setAttribute('class', 'checkbox-input-master');
	input.setAttribute('checked', true);
	var span = document.createElement('span');
	span.setAttribute('class', 'material-icons checkbox-icon');
	span.innerHTML = 'check_box';
	lbl.appendChild(input);
	lbl.appendChild(span);

	th.appendChild(lbl);
	tr.appendChild(th)
	th = document.createElement('th');
	th.innerHTML = 'Source';
	tr.appendChild(th)
	th = document.createElement('th');
	th.innerHTML = 'Destination';
	tr.appendChild(th)
	return tr;
}

function create_td(select, table, data) {
	var tr = document.createElement('tr');
	var td = document.createElement('td');

	var lbl = document.createElement('label');
	lbl.setAttribute('class', 'vig-checkbox inline');
	var input = document.createElement('input');
	input.setAttribute('type', 'checkbox');
	input.setAttribute('class', 'checkbox-input');
	input.setAttribute('checked', true);
	var span = document.createElement('span');
	span.setAttribute('class', 'material-icons checkbox-icon');
	span.innerHTML = 'check_box';
	lbl.appendChild(input);
	lbl.appendChild(span);

	td.appendChild(lbl);
	tr.appendChild(td)
	td = document.createElement('td');
	td.innerHTML = data;
	tr.appendChild(td)
	td = document.createElement('td');
	td.append(get_table_columns(select, table));
	shift_likely_option(data, td.children[0]);
	tr.appendChild(td)
	return tr;
}

function shift_likely_option(src, dest) {
	var index = 0;
	var score = 0;
	for (var i = 0; i < dest.childElementCount; i++) {
		var val = dest.children[i].innerHTML;
		var cur_score = similar(val, src);
		if (cur_score > score) {
			index = i;
			score = cur_score
		}
	}
	if (score >= 50)
		dest.children[index].setAttribute('selected', true);
	else
		var a;
}

function create_import_columns(select, table_col, headers) {
	var div = document.createElement('div');
	div.setAttribute('class', 'import-table-settings');
	var span = document.createElement('span');
	span.setAttribute('class', 'h5');
	span.innerHTML = 'Columns';
	var table_container = document.createElement('div');

	var table = document.createElement('table');
	var th = create_th();
	table.appendChild(th);
	for (var i = 0; i < headers.length; i++) {
		var td = create_td(select, table_col, headers[i]);
		table.appendChild(td);
	}
	div.appendChild(span);
	table_container.appendChild(table);
	div.appendChild(table_container);
	
	$('.progress-body > .container').append(div);
}

function get_table_columns(selects, id) {
	var select_elem = selects.childElementCount-1;
	id += '_table';
	for (var i = 0; i < select_elem; i++) {
		if (selects.children[i].id === id)
			var selected_table = selects.children[i].cloneNode(true);
	}
	return selected_table;
}

function get_columns() {
	var div = document.createElement('div');
	for (var i = 0; i < tables.length; i++) {
		var select = document.createElement('select');
		select.setAttribute('id', tables[i].table_name+'_table');
		var option = document.createElement('option');
		option.setAttribute('disabled', true);
		option.setAttribute('selected', true);
		option.innerHTML = '...';
		select.appendChild(option);
		for (var x = 0; x < tables[i].columns.length; x++) {
			var option = document.createElement('option');
			option.setAttribute('value', tables[i].columns[x].name);
			option.innerHTML = tables[i].columns[x].name;
			select.appendChild(option);
		}
		div.appendChild(select);
	}
	return div;
}

function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("import_file");
    window.file_data = '';
    //Validate whether File is valid Excel file.
    var regex = /\.([^.]*?)(?=\?|#|$)/;
    window.file_type = fileUpload.value.toLowerCase().match(regex)[1];
    if (file_type === 'xls' || file_type === 'xlsx') {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                	file_data = e.target.result;
                    ProcessExcel(file_data);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } 
            else {
                //For IE Browser.
                reader.onload = function (e) {
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        file_data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(file_data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } 
        else {
            alert("This browser does not support HTML5.");
        }
    }
    else if (file_type === 'csv') {

    }
    else if (file_type === 'json') {

    }
    else {
        alert("Invalid file type");
    }
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var i, x;

	//Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header : 1, defval : "" });

    var string = '';
    //Get headers
    window.headers = [];
    for (i = 0; i < excelRows[0].length; i++) {
    	headers.push(excelRows[0][i]);
    }
    window.preview = [];
    var row_prev = [];
    var max;
    var excel_val;
    if (excelRows.length < 10)
    	max = excelRows.length;
    else
    	max = 10;
    for (i = 1; i < max; i++) {
    	for (var x = 0; x < excelRows[i].length; x++) {
    		row_prev.push(excelRows[i][x]);
    	}
    	preview.push(row_prev);
    	row_prev = [];
    }
    preview_file_data(headers, preview);
}

function finalProccessExcel(data, columns, opt) {
	var sql_as_key = true;
    var null_as_key = true;
    for (var i = 0; i < opt.length; i++) {
    	if (opt[i].name === 'sql_keyword' && opt[i].val !== 'yes')
    		sql_as_key = false;
    	else if (opt[i].name === 'empty_as_null' && opt[i].val !== 'yes')
    			null_as_key = false; 
    }

	var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var sheet = workbook.SheetNames[0];
    var sheet_options = { header: 1 };
    if (null_as_key)
    	sheet_options['defval'] = 'null_keyword';
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], sheet_options);
    var objArr = [];
    var json;
    var vals = '';
    for (var i = 1; i < excelRows.length; i++) {
    	var obj = {};
    	for (var x = 0; x < columns.length; x++) {
    		obj[columns[x].dest] = excelRows[i][columns[x].src];
    		if (sql_as_key && excelRows[i][columns[x].src].toLowerCase() === 'null')
    			obj[columns[x].dest] = 'null_keyword';
    	}
    	objArr.push(obj);
    }
    json = JSON.stringify(objArr);
    return json;
}