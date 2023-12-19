const searchParams = new URLSearchParams();
searchParams.append('param', 'value')

fetch(`https://localhost?${searchParams.toString()}`)
.then((response)=> {
    response.json()//text, blob
    if(response.status)
    console.log('success');

})
.then((result) => {

})
.catch(()=>{})