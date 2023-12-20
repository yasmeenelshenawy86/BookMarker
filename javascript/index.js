///*************  Global Variable   ************///
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var siteSearchInput = document.getElementById('searchInput');
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var fixedBox = document.getElementById("fixed-box");
var delBtn = document.getElementById("delBtn");
var cancelBtn = document.getElementById("cancelBtn");
var showBtn = document.getElementById("showBtn");
var closeBtn = document.getElementById("closeBtn");
var getIndex = 0;

var updateIndex = 0;

var siteList = [];

if (localStorage.getItem("sites") !== null) {
	siteList = JSON.parse(localStorage.getItem("sites"));
	siteDisplay();
}

///*************  function Add Site ************///
function addSite() {
	if (urlValid() == true && urlNameValid() == true) {
    var site = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    siteList.push(site);
    localStorage.setItem("sites", JSON.stringify(siteList));
    siteDisplay();
    clearForm();
  }
}

///*************  function Clear Form ************///
function clearForm() {
	siteNameInput.value = "";
	siteUrlInput.value = "";
}

///*************  function Site Display ************///
function siteDisplay() {
	var rowData = "";
	for (var i = 0; i < siteList.length; i++){
		rowData += `<tr>
	<td class="fw-semibold">${i + 1}</td>
	<td class="fw-semibold">${siteList[i].siteName}</td>
	<td class="fw-semibold"><a href="${siteList[i].siteUrl}" data-toggle="tooltip" data-placement="top" title=${siteList[i].siteUrl}><i class="fa-regular fa-eye"></i></a></td>
	<td><button class="btn text-warning" onclick="setData(${i})"><a class="text-warning" href="#form-content"><i class="fa-regular fa-pen-to-square"></i></a></button></td>
	<td><button id="showBtn" class="btn text-danger" onclick="showBox(${i})"><a class="text-danger" href="#form-content"><i class="fa-solid fa-trash"></i></a></button></td>
	</tr>`;
	}
	document.getElementById('tableBody').innerHTML = rowData;
}
///*************  function Search By Names ************///
function search() {
	var term = siteSearchInput.value;
	var rowData = "";
	for (var i = 0; i < siteList.length; i++) {
		if (siteList[i].siteName.toLowerCase().includes(term.toLowerCase())) {
      rowData += `<tr>
			<td class="fw-semibold">${i + 1}</td>
			<td class="fw-semibold">${siteList[i].siteName}</td>
			<td class="fw-semibold"><a href="">${siteList[i].siteUrl}</a></td>
			<td><button class="btn text-warning" onclick="editSite(${i})"><i class="fa-regular fa-pen-to-square"></i></button></td>
			<td><button class="btn text-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i></button></td>
    	</tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = rowData;
}

///*************  function Site Delete ************///
function deleteSite(delIndex) {
	delIndex = getIndex;
	console.log(delIndex)
		siteList.splice(delIndex, 1);
        localStorage.setItem("sites", JSON.stringify(siteList));
        siteDisplay();
}

///*************  function Site Set Data ************///
function setData(eleIndex) {
	updateIndex = eleIndex;
	var currElement = siteList[eleIndex];
	siteNameInput.value = currElement.siteName;
	siteUrlInput.value = currElement.siteUrl;
	updateBtn.classList.remove("d-none");
	addBtn.classList.add("d-none");
}

///*************  function Site Update Data ************///
function updateData() {
	var site = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
	};
	siteList.splice(updateIndex, 1, site);
	localStorage.setItem("sites", JSON.stringify(siteList));
	updateBtn.classList.add("d-none");
	addBtn.classList.remove("d-none");
	clearForm();
	siteDisplay();

// 	if (isUrlValid(siteUrlInput.value)) {
// 	siteList.splice(updateIndex, 1, site);
//     localStorage.setItem("sites", JSON.stringify(siteList));
//     alert.classList.add("d-none");
//     clearForm();
//     siteDisplay();
//   } else {
//     alert.classList.remove("d-none");
//   }
}

///*************  function Validation Of URL ************///
function urlValid() {
	var regexUrl = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
	var urlCheck = siteUrlInput.value;
	var alert = document.getElementById("alertBox");
	if (regexUrl.test(urlCheck)) {
		siteUrlInput.classList.add('is-valid');
		siteUrlInput.classList.remove('is-invalid');
		alert.classList.add('d-none');
		return true
	} else {
		siteUrlInput.classList.add('is-invalid');
		siteUrlInput.classList.remove('is-valid');
		alert.classList.remove('d-none');
		return false;
	}
}

///*************  function Validation Of URL Name ************///
function urlNameValid() {
  var regexName = /^[A-Za-z][a-zA-Z0-9_]{3,100}$/;
  var NameCheck = siteNameInput.value;
  var alert = document.getElementById("alertCheckName");
  if (regexName.test(NameCheck)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    alert.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    alert.classList.remove("d-none");
    return false;
  }
}

///*************  function Close Box   ************///
function closeBox() {
	fixedBox.classList.replace("d-flex", "d-none");
}

//***************** Event Close Box  ************//
cancelBtn.addEventListener("click", closeBox);
closeBtn.addEventListener("click", closeBox);

///*************  function confirmation Delete   ************///
function showBox(currIndex) {
	getIndex = currIndex;
	fixedBox.classList.replace("d-none", "d-flex");
}

//***************** Event Delete  ************//
delBtn.addEventListener("click", function () {
	deleteSite();
	closeBox(); 
});
