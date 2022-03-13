
let myLeads = []
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputField = document.getElementById("input-el")
const listsVar = document.getElementById("Lists")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        // li.textContent = leads[i]
        // listsVar.append(li)
        // This is the same as line 19 but more human readable 
        listItems += `
            <li>
                <img src="./images/link.png">
                    <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                </li>
        `
    }
    listsVar.innerHTML = listItems
}

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


