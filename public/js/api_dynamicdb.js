function toggleAdvSettings(target) {
	if (target.children[0].children[3].tagName.toLowerCase() == 'div')
		var icon = target.children[0].children[4].children[0];
	else
		var icon = target.children[0].children[3].children[0];
	$(icon).toggleClass('rotate-icon');
	$(icon).toggleClass('arrow-icon');
	var settings = target.children[1];
	$(settings).toggleClass('hide');
}

function toggleCheckbox(target) {
	var box = target.children[1];
	if (box.innerHTML == 'check_box')
		$(box).html('check_box_outline_blank');
	else
		$(box).html('check_box');
}

function addField() {
	var container = document.getElementById('fld_container');
	var card = document.createElement('div');
	card.setAttribute('class', 'card shadow-sm mt-3 pt-3 pb-4');

	var flex_container = document.createElement('div');
	flex_container.setAttribute('class', 'd-flex mx-3 ml-4');

	var settings = createAdvSettings();

	for (var i = 0; i < 3; i++) {
		var db_container = createContainer();

		var label = createLabel(i);
		if (i == 1)
			db_container.classList.add('mx-3');
		else if (i == 2)
			db_container.classList.add('mr-auto');

		if (i != 2)
			var input = createTextInput(i);
		else
			var input = createSelectInput();

		var msg = document.createElement('span');
		msg.setAttribute('class', 'text-help');
		db_container = joinContainerElements(db_container, label, input, msg);
		flex_container.appendChild(db_container);
	}
	flex_container.appendChild(createButton());
	card.appendChild(flex_container);
	card.appendChild(settings);
	container.appendChild(card);

	$('#btnSubmit').removeClass('primary');
	$('#btnSubmit').addClass('disabled');
}

function removeField(target) {
	$(target).remove();
}

function createContainer() {
	var db_container = document.createElement('div');
	db_container.setAttribute('class', 'db-container');

	return db_container;
}

function createLabel(num) {
	var div = document.createElement('div');
	div.setAttribute('class', 'field-label');
	var label = document.createElement('label');
	label.setAttribute('class',' ml-1');
	var tip = document.createElement('span');
	tip.setAttribute('class', 'material-icons info');
	tip.setAttribute('data-toggle', 'tooltip');
	tip.setAttribute('data-placement', 'right');
	tip.innerHTML = 'error_outline';
	if (num == 0) {
		label.innerHTML = 'Field Label';
		tip.setAttribute('title', 'The field value to appear in list values and form fields');
	}
	else if (num == 1) {
		label.innerHTML = 'Field Name';
		tip.setAttribute('title', 'The actual field name within the table.');
	}
	else if (num == 2) {
		label.innerHTML = 'Field Type';
		tip.setAttribute('title', 'The data type of the value');
	}
	div.appendChild(label);
	div.appendChild(tip);
	return div;
}

function createTextInput(index) {
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	if (index == 0)
		input.setAttribute('class', 'db-input lbl');
	else if (index == 1)
		input.setAttribute('class', 'db-input name');

	return input;
}

function createSelectInput() {
	var wrapper = document.createElement('div');
	wrapper.setAttribute('class', 'select-wrapper');
	var input = document.createElement('select');
	input.setAttribute('class', 'd-block db-select');
	var icon = document.createElement('span');
	icon.setAttribute('class', 'material-icons select-icon');
	icon.innerHTML = 'play_arrow';

	var opt = document.createElement('option');
	opt.setAttribute('class', 'text-muted');
	opt.setAttribute('disabled', true);
	opt.setAttribute('selected', true);
	opt.setAttribute('value', '');
	opt.innerHTML = 'None';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Boolean');
	opt.innerHTML = 'True/False';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Choice');
	opt.innerHTML = 'Choice';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Decimal');
	opt.innerHTML = 'Decimal';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Date/Time');
	opt.innerHTML = 'Date/Time';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Date');
	opt.innerHTML = 'Date';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Time');
	opt.innerHTML = 'Time';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Integer');
	opt.innerHTML = 'Integer';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'String');
	opt.innerHTML = 'String';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'URL');
	opt.innerHTML = 'URL';
	input.appendChild(opt);

	var opt = document.createElement('option');
	opt.setAttribute('value', 'Reference');
	opt.innerHTML = 'Reference';
	input.appendChild(opt);

	wrapper.appendChild(input);
	wrapper.appendChild(icon);
	return wrapper;
}

function joinContainerElements(cont, label, input, msg) {
	cont.appendChild(label);
	cont.appendChild(input);
	cont.appendChild(msg);
	return cont;
}

function createButton() {
	var btn = document.createElement('button');
	btn.setAttribute('class', 'field_arrow noselect');
	btn.setAttribute('onclick', 'toggleAdvSettings(this.parentNode.parentNode);');
	btn.setAttribute('type', 'button');
	var icon = document.createElement('span');
	icon.setAttribute('class', 'material-icons arrow-icon');
	icon.innerHTML = 'keyboard_arrow_down';
	btn.appendChild(icon);
	return btn;
}

function createAdvSettings() {
	var settings = document.createElement('div')
	settings.setAttribute('class', 'd-flex ml-4 mr-3 mt-3 advanced-settings hide');
	var div = document.createElement('div');
	div.setAttribute('class', 'mr-auto');

	var lbl = document.createElement('label');
	lbl.setAttribute('class', 'vig-checkbox inline noselect');

	var checkbox = document.createElement('input');
	checkbox.setAttribute('class', 'checkbox-input bg-info noselect');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('onclick', 'toggleCheckbox(this.parentNode);');
	checkbox.setAttribute('value', 'mandatory');

	var icon = document.createElement('span');
	icon.setAttribute('class', 'material-icons checkbox-icon');
	icon.innerHTML = 'check_box_outline_blank';

	var iconlbl = document.createElement('span');
	iconlbl.setAttribute('class', 'checkbox-label');
	iconlbl.innerHTML = 'Mandatory';

	var del = document.createElement('a');
	del.setAttribute('class', 'db-text-link primary sm');
	del.setAttribute('href', '#');
	del.setAttribute('onclick', 'removeField(this.parentNode.parentNode);');
	del.innerHTML = 'Delete field';

	lbl.appendChild(checkbox);
	lbl.appendChild(icon);
	lbl.appendChild(iconlbl);

	div.appendChild(lbl);
	settings.appendChild(div);
	settings.appendChild(del);

	return settings;
}

function insertStringField(target) {
	var container = document.createElement('div');
	container.setAttribute('class', 'db-container mr-auto');
	var divlbl = document.createElement('div');
	divlbl.setAttribute('class', 'field-label');
	var lbl = document.createElement('label');
	lbl.setAttribute('class', 'ml-1');
	lbl.innerHTML = 'Character Limit';
	var input = document.createElement('input');
	input.setAttribute('type', 'number');
	input.setAttribute('class', 'db-input');
	input.setAttribute('value', '30');
	input.setAttribute('min', '1');
	input.setAttribute('step', '1');
	var msg = document.createElement('span');
	msg.setAttribute('class', 'text-help');

	divlbl.appendChild(lbl);
	container.appendChild(divlbl);
	container.appendChild(input);
	container.appendChild(msg);

	$($(target).children()[2]).removeClass('mr-auto');
	$($(target).children()[2]).addClass('mr-3');
	$(container).insertAfter($(target).children()[2]);
}

function removeStringField(target) {
	$($(target).children()[2]).removeClass('mr-3');
	$($(target).children()[2]).addClass('mr-auto');
	$($(target).children()[3]).remove();
}

function insertTableHeaders() {
	var tr = document.createElement('tr');
	var th = document.createElement('th');
	th.innerHTML = 'Field Name';
	tr.appendChild(th);
	th = document.createElement('th');
	th.innerHTML = 'Field Value';
	tr.appendChild(th);
	th = document.createElement('th');
	th.innerHTML = 'Field Datatype';
	tr.appendChild(th);
	th = document.createElement('th');
	th.innerHTML = 'Required Field';
	tr.appendChild(th);
	return tr;
}

function insertTableData(table) {
	var container = document.querySelector('.progress-body > #container').children[1];
	var tr;
	var td;
	for (var i = 0; i < container.childElementCount; i++) {
		tr = document.createElement('tr');
		var arr = Array.from(container.children[i].querySelectorAll('input[type="text"]'));
		arr.splice(2, 0, container.children[i].querySelector('select'));
		if (container.children[i].querySelector('input[type="number"]'))
			arr.push(container.children[i].querySelector('input[type="number"]'));
		arr.push(container.children[i].querySelector('input[type="checkbox"]'));
		for (var x = 0; x < arr.length; x++) {
			td = document.createElement('td');

			td.innerHTML = arr[x].value;
			if (arr[x].type.toLowerCase() === 'select-one') {
				if (arr[x+1].type.toLowerCase() === 'number') {
					td.innerHTML = arr[x].value+' ('+arr[x+1].value+')';
					x++;
				}
			}
			tr.appendChild(td);
			if (arr[x].type.toLowerCase() === 'checkbox') {
				if (arr[x].checked)
					td.innerHTML = 'Yes';
				else
					td.innerHTML = 'No';
			}
				
		}
		table.appendChild(tr);
	}
	return table;
}

function createTableData() {
	var table = document.createElement('table');
	table.setAttribute('class', 'table table-striped');
	var tr = insertTableHeaders();
	table.appendChild(tr);
	table = insertTableData(table);
	return table;
}

function resetTableForm(step, modal) {
	var container = document.querySelector('.field_container');
	for (var i = 0; i < container.childElementCount; i++) {
		$(container.children[i]).remove();
	}

	var text = $(container).find('input:text');
	text.val('');
	text.removeClass('warning');
	var msg = $(container).find('.text-help');
	for (i = 0; i < 3; i++)
		msg[i].innerHTML = '';
	var select = $(container).find('select').prop('selectedIndex',0);
	select.removeClass('warning');

	if (container.children[0].children[0].children[3].tagName.toLowerCase() === 'div') 
		removeStringField(container.children[0].children[0]);

	var icon = container.children[0].children[0].children[3].children[0];
	$(icon).removeClass('rotate-icon');
	$(icon).addClass('arrow-icon');
	var settings = container.children[0].children[1];
	$(settings).addClass('hide');
	$(container).find('input:checkbox').prop('checked', false);

	$('#btnSubmit').removeClass('primary');
	$('#btnSubmit').addClass('disabled');
	if (step)
		viewTableCreate(0, modal);
}

function progressBar(step) {
	if (step == 1) {
		var step = document.querySelector('.modal-head').children[0].children[2];
		var circle = document.querySelector('.modal-head').children[0].children[0].children[0];
		var currStep = document.querySelector('.modal-head').children[0].children[0];
		circle.classList.remove('small_circle');
		circle.classList.add('circle');
		circle.innerHTML = 'fiber_manual_record';
	}
	else if (step == 2) {
		var step = document.querySelector('.modal-head').children[0].children[0];
		var circle = document.querySelector('.modal-head').children[0].children[0].children[0];
		var currStep = document.querySelector('.modal-head').children[0].children[2];
		circle.classList.remove('circle');
		circle.classList.add('small-circle');
		circle.innerHTML = 'check_circle_outline';
	}

	step.classList.remove('current');
	currStep.classList.add('current');
}

function progressLabel(step) {
	var lbl1 = document.querySelector('.progress-label').children[0];
	var lbl2 = document.querySelector('.progress-label').children[2];
	if (step == 1) {
		lbl1.innerHTML = "Excellent! Let's start defining your new table";
		lbl2.innerHTML = 'Make sure to update necessary fields before we continue';
	}
	else if (step == 2) {
		lbl1.innerHTML = 'Almost done!';
		lbl2.innerHTML = 'Verify table structure and data types';
	}
}

function progressBody(step) {
	var body = document.querySelector('.progress-body').children[0];
	if (step == 1) {
		body.classList.remove('hide');
		var table = document.querySelector('.progress-body > table');
		$(table).remove();
	}
	else if (step == 2) {
		body.classList.add('hide');
		var table = createTableData();
		body = document.querySelector('.progress-body');
		body.appendChild(table);
	}
}

function progressBtn(step, disabled, modal) {
	var footer = document.querySelector('.dialog-footer');
	for (var i = footer.childElementCount-1; i >= 0; i--) {
		$(footer.children[i]).remove();
	}
	var btn1 = document.createElement('button');
	btn1.setAttribute('class', 'button-vig md tertiary mx-2');
	btn1.setAttribute('type', 'button');
	var btn2 = document.createElement('button');
	btn2.setAttribute('class', 'button-vig md disabled');
	btn2.setAttribute('type', 'button');
	if (step == 1) {
		btn1.setAttribute('data-dismiss', 'modal');
		btn1.setAttribute('onclick', 'resetTableForm(0, '+modal+');');
		btn1.innerHTML = 'Close';

		btn2.setAttribute('id', 'btnSubmit');
		btn2.setAttribute('onclick', 'viewTableData();');
		if (disabled == 0) {
			btn2.classList.remove('disabled');
			btn2.classList.add('primary');
		}
		btn2.innerHTML = 'Continue';
	}
	else if (step == 2) {
		btn1.setAttribute('onclick', 'viewTableCreate(1, '+modal+');');
		btn1.innerHTML = 'Back';

		btn2.setAttribute('type', 'button');
		btn2.classList.remove('disabled');
		btn2.classList.add('primary');
		btn2.innerHTML = 'Submit';
	}
	if (step == 2)
		footer.appendChild(btn1);
	footer.appendChild(btn2);
}

function addWarning(target, index) {
	$(target).addClass('warning');
	var msg = $(target).next();
	if (index == 0)
		$(msg).html('Label is required');
	else if (index == 1)
		$(msg).html('Name is required');
	else if (index == 2) {
		msg = $(target).parent().next();
		$(msg).html('Type is required');
	}
	else if (index == 3) {
		$(msg).html('Count must be greater than 0');
	}
	else if (index == 4) {
		$(msg).html('Cannot have similar field name');
	}
	else if (index == 5) {
		$(msg).html('Cannot have similar field label');
	}
}

function removeWarning(target, index) {
	$(target).removeClass('warning');
	var msg = $(target).next();
	if (index == 0)
		$(msg).html('');
	else if (index == 1)
		$(msg).html('');
	else if (index == 2) {
		var msg = $(target).parent().next();
		$(msg).html('');
	}
	else if (index == 3) {
		$(msg).html('');
	}
}

function validateForm(msg) {
	var complete = validateString();
	var container = document.querySelector('.progress-body > #container').children[1];
	for (var i = 0; i < container.childElementCount; i++) {
		var arr = Array.from(container.children[i].querySelectorAll('input[type="text"]'));
		arr.splice(2, 0, container.children[i].querySelector('select'));
		for (var x = 0; x < arr.length; x++) {
			if (arr[x].value == '') {
				if (msg)
					addWarning(arr[x], x);
				complete = false;
			}
			else
				removeWarning(arr[x], x);
		}
	}
	if (complete) complete = validateUniqueFields();
	else validateUniqueFields();
	if (complete) toggleBtn(0);
	else toggleBtn(1);
	return complete;
}

function validateString() {
	var string = document.querySelectorAll('input[type="number"]');
	var complete = true;
	for (var i = 0; i < string.length; i++) {
		if (string[i].value == '' || parseInt(string[i].value) <= 0) {
			addWarning(string[i], 3);
			complete = false;
		}
		else
			removeWarning(string[i], 3);
	}
	return complete;
}

function viewTableCreate(back, modal) {
	progressBar(1);
	progressLabel(1);
	progressBody(1);	
	if (back)
		progressBtn(1, 0, modal);
	else
		progressBtn(1, 1);
}

function viewTableData() {
	if (validateForm()) {
		progressBar(2);
		progressLabel(2);
		progressBody(2);
		progressBtn(2, 1);
	}
}

function regexCharNum(val) {
	var str = val.replace(/[^a-zA-Z0-9]/g, "_");
	return str;
}

function validateUniqueFields() {
	var names = document.querySelectorAll('input.name');
	var labels = document.querySelectorAll('input.lbl');
	var status = true;
	for (var i = 0; i < names.length; i++) {
		for (var x = 0; x < names.length; x++) {
			if (i != x) {
				if (labels[i].value == labels[x].value) {
					addWarning(labels[i], 4);
					addWarning(labels[x], 4);
					status = false;
				}
				if (names[i].value == names[x].value) {
					addWarning(names[i], 5);
					addWarning(names[x], 5);
					status = false;
				}
			}
		}
	}
	return status;
}

function label_to_name(target, val) {
	var cont = $(target).parent().parent().find('input')[1];
	$(cont).val(regexCharNum(val.toLowerCase()));
}

function toggleBtn(disable) {
	if (disable) {
		$('#btnSubmit').removeClass('primary');
		$('#btnSubmit').addClass('disabled');
	}
	else {
		$('#btnSubmit').removeClass('disabled');
		$('#btnSubmit').addClass('primary');
	}
}

function create_header(target, modal) {
	if (modal)
		var html = '<div class="modal-head"><div class="step-header mr-auto"><div class="current step"><span class="material-icons-outlined circle mr-2">fiber_manual_record</span><span class="step-label">Data</span></div><span class="material-icons divider mx-3">remove</span><div class="step"><span class="material-icons-outlined circle mr-2">fiber_manual_record</span><span class="step-label">Table Information</span></div></div><button type="button" class="btn-transparent" data-dismiss="modal" onclick="resetTableForm(1, '+modal+');"><span class="material-icons close">close</span></button></div>';
	else
		var html = '<div class="modal-head"><div class="step-header"><div class="current step"><span class="material-icons-outlined circle mr-2">fiber_manual_record</span><span class="step-label">Data</span></div><span class="material-icons divider mx-3">remove</span><div class="step"><span class="material-icons-outlined circle mr-2">fiber_manual_record</span><span class="step-label">Table Information</span></div></div></div>';
	
	var html_label = '<div class="progress-label"><span class="h5">Excellent! Let'+"'"+'s start defining your new table</span><br><span class="mt-2">Make sure to update necessary fields before we continue</span></div>';

	$(target).append(html);
	$(target).append(html_label);
}

function create_body(target, modal, form) {
	var form = document.createElement('form');
	form.setAttribute('class', 'form');
	form.setAttribute('action', form);
	form.setAttribute('method', 'GET');

	var html = '<div class="progress-body"> <div id="container"> <a class="db-add-field db-text-link primary" href="javascript:addField();">Add New Field</a> <div class="field_container" id="fld_container"> <div class="card shadow-sm pt-3 pb-4"> <div class="d-flex mx-3 ml-4"> <div class="db-container"> <div class="field-label"> <label class="ml-1">Field Label</label> <span class="material-icons info" data-toggle="tooltip" title="The field value to appear in list values and form fields" data-placement="right">error_outline</span> </div> <input type="text" class="db-input lbl" id="" name=""> <span class="text-help"></span> </div> <div class="mx-3 db-container"> <div class="field-label"> <label class="ml-1">Field Name</label> <span class="material-icons info" data-toggle="tooltip" title="The actual field name within the table." data-placement="right">error_outline</span> </div> <input type="text" class="db-input name" id="" name=""> <span class="text-help"></span> </div> <div class="db-container mr-auto"> <div class="field-label"> <label class="ml-1">Field Type</label> <span class="material-icons info" data-toggle="tooltip" data-placement="right" title="The data type of the value">error_outline</span> </div> <div class="select-wrapper" id="" name=""> <select class="d-block db-select"> <option disabled selected class="text-muted" value="">None</option> <option value="Boolean">True/False</option> <option value="Choice">Choice</option> <option value="Decimal">Decimal</option> <option value="Date/Time">Date/Time</option> <option value="Date">Date</option> <option value="Time">Time</option> <option value="Integer">Integer</option> <option value="String">String</option> <option value="URL">URL</option> <option value="Reference">Reference</option> </select> <span class="material-icons select-icon">play_arrow</span> </div> <span class="text-help"></span> </div> <button type="button" class="field_arrow" onclick="toggleAdvSettings(this.parentNode.parentNode);"> <span class="material-icons arrow-icon">keyboard_arrow_down</span> </button> </div> <div class="d-flex ml-4 mr-3 mt-3 advanced-settings hide"> <div class="mr-auto"> <label class="vig-checkbox inline"> <input type="checkbox" class="checkbox-input bg-info" onclick="toggleCheckbox(this.parentNode);" value="mandatory" id="" name=""> <span class="material-icons checkbox-icon">check_box_outline_blank</span> <span class="checkbox-label">Mandatory</span> </label> </div> <a class="db-text-link primary sm" onclick="removeField(this.parentNode.parentNode);" href="#">Delete field</a> </div> </div> </div> </div> </div>';
	form.innerHTML += html;
	$(target).append(form);
}

function create_footer(target, modal) {
	if (modal)
		var html = '<div class="dialog-footer border-top"> <button type="button" class="button-vig md tertiary mx-2" onclick="resetTableForm(0,'+modal+')" data-dismiss="modal">Close</button> <button type="button" class="button-vig md disabled" id="btnSubmit" onclick="viewTableData()">Continue</button> </div>';
	else 
		var html = '<div class="dialog-footer border-top"> <button type="button" class="button-vig md disabled" id="btnSubmit" onclick="viewTableData()">Continue</button> </div>';
	$(target).append(html);
}

function create_menu(target, modal, form) {
	target = $('#'+target);
	var body = document.createElement('div');
	body.setAttribute('class', 'modal-body');
	create_header(body, modal);
	create_body(body, modal, form);
	$(target).append(body);
	create_footer(target, modal);
}

$(document).ready(function() {
	$('body').tooltip({selector: '[data-toggle="tooltip"]'});
	$('.field_container').on('keyup', 'input[type="text"]', function() {
		removeWarning(this, 0);
		var index = $('input[type="text"]').index(this);
		index %= 2;
		if (index == 0) {
			label_to_name(this, $(this).val());
			var lbl = $(this.parentNode.parentNode.children[1].children[1]);
			removeWarning(lbl, 1);
		}
		if (!$(this).val()) {
			addWarning(this, index);
			if (index == 0)
				addWarning(this.parentNode.parentNode.children[1].children[1], index+1);
		}
		validateForm(0);
	});

	$('.field_container').on('change', 'select',function() {
		removeWarning(this, 2);
		if ($(this).val().toLowerCase() === 'string')
			insertStringField(this.parentNode.parentNode.parentNode);
		else {
			if (this.parentNode.parentNode.parentNode.children[3].tagName.toLowerCase() === 'div')
				removeStringField(this.parentNode.parentNode.parentNode);
		}
		validateForm(0);
	});

	$('.field_container').on('keyup', 'input[type="number"]', function() {
		if ($(this).val() == '' || parseInt($(this).val()) <= 0) {
			addWarning(this, 3);
			toggleBtn(1);
		}
		else {
			removeWarning(this, 3)
			validateForm(0);
		}
	});

});