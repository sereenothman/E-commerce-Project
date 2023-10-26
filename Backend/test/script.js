fetch("http://localhost:3002/admin/products").then((res)=>{
 return res.json()
})
.then((data)=>{console.log(data)})