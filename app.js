
const result = document.getElementById('result');
const resultNumber = document.getElementById('resultNumber');

//   toggle spinner 
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
} 


 //  Search Area 
const searchBook = () =>{
    const searchInput = document.getElementById('searchText');
    const searchText = searchInput.value;
    searchInput.value ='';
    toggleSpinner('block');

         
    if(searchText===''){
        
        result.innerHTML=`
           <h3 class="mx-auto mt-2 text-danger">Please write something to Display</h3>
           `
           toggleSpinner('none');

    }
    else{
        result.innerHTML='';
        resultNumber.innerHTML='';
        const url =`
        https://openlibrary.org/search.json?q=${searchText}
        `
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data));
    }
    
    


}

            //  Display seachResult 
const searchResult = books =>{
    console.log(books);
    const bookFilter = books.docs.filter(element => element.cover_i !== undefined && element.title !== undefined && element.author_name !== undefined && element.first_publish_year !== undefined && element.first_sentence !== undefined)
      
            //  no result 
    if(bookFilter.length === 0){
            result.innerHTML =`
                  <h2 class="mx-auto">No Result Found!</h2>`
                  toggleSpinner('none');
        }

        //    Append result 
    else{
        resultNumber.innerHTML=`
            <h4 class="container mt-5 text-center">Resultfound: ${books.numFound}</h4>
       `          
                //  Card 
        bookFilter.forEach(book => {
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
             <div class="card h-75 mx-auto pb-0">
             <img class="h-50" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="...">
             <div class="card-body pb-0 card-style">
             <h5 class="card-title">${book.title}</h5>
             <h5 class="card-title">${book.author_name.slice(0,2)}</h5>
             <h5 class="card-title">${book.publisher[0].slice(0, 25)}</h5>
             <h5 class="card-title">${book.first_publish_year}<h5>
        `
    result.appendChild(div);
    toggleSpinner('none');
    });
    }
        
}
