
let count=0;
function localStorageHandler(){


fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    for (const singleData of data) {
      count++;
        // console.log(singleData.population);
      const container = document.getElementById("cardContainer");
      
      const div= document.createElement('div');
      // const div2= document.createElement('tr');
      const markedItem=checkBookmarked(singleData.id);
     
      div.innerHTML = `
      <div class="card">
      <img src="${singleData.flagImage}" class=" w-full h-96" alt="...">
      <div class="card-body">
        <h5 class="card-title text-primary">${singleData.countryName}</h5>
        <p class="card-text fs-5 text-secondary">Population: ${singleData.population}</p>


        ${
          markedItem ?
          `<button onclick="removeBookmark('${singleData.id}')" class="btn btn-sm btn-danger">Remove from Bookmark</button>` :
          `<button onclick="addBookmark('${singleData.id}','${singleData.flagImage}','${singleData.countryName}','${singleData.population}')" class="btn btn-sm btn-primary">Bookmark</button>`
        }
      </div>
    </div>
        `;
    //   console.log(singleData.flags.png);
      container.appendChild(div);
      // bookmarkedContainer.appendChild(div2);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
}








  function addBookmark(id,flag,countryName,population){
    const info={
        id,countryName,population,bookmark:true
    }
  
  const previousBookmark=JSON.parse(localStorage.getItem("bookmark"));
  // console.log(previousBookmark);
  let bookmark=[];
  if(previousBookmark){
    const isBookmark=previousBookmark.find(pd=> pd.id==id);
    if(isBookmark){
      const bookmarkedContainer = document.getElementById("bookmarkedContainer");
      
        Swal.fire({
            title: 'Ohh!!',
            text: 'You have already bookmarked this.',
            // icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    else{
        bookmark.push(...previousBookmark,info);
        localStorage.setItem("bookmark",JSON.stringify(bookmark));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You bookmarked successfully",
            showConfirmButton: false,
            timer: 1500
          });
    }
  }
  else{

    bookmark.push(info);
    localStorage.setItem("bookmark",JSON.stringify(bookmark));
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You bookmarked successfully",
        showConfirmButton: false,
        timer: 1500
      });
    // console.log('nai');
  }
  
    // console.log(info);
  }






  function removeBookmark(id){
    // console.log(id);
    const previousBookmark=JSON.parse(localStorage.getItem("bookmark"));
    const existingData=previousBookmark.filter(pd=> pd.id!=id);
    // previousBookmark.push(existingData);
    localStorage.setItem("bookmark",JSON.stringify(existingData));
  }


  const checkBookmarked = (id)=>{
    const previousBookmark=JSON.parse(localStorage.getItem("bookmark"));
    const isMarked=previousBookmark.find(dt=>dt.id==id);
    if(isMarked){
      return true
    }
    else{
      return false
    }
  };



  function displayDataFromLocalStorage() {
    const localStorageData = JSON.parse(localStorage.getItem("bookmark")) || [];
    const tableBody = document.getElementById("bookmarkedContainer");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through the data and populate the table

    
    localStorageData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.id}</td>
            <td>${item.countryName}</td>
            <td>${item.population}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Call the function to display the data when needed
displayDataFromLocalStorage();

  localStorageHandler();
