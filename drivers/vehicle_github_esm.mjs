



console.log('GITHUB VEHICLE interpreted ')
//import { Octokit } from "@octokit/core.js";

// const octokit = new Octokit();
// console.log( 'wut ')
  
//   //com/en/rest/reference/repos/#list-organization-repositories
  
// octokit.rest.repos
//   .listForOrg({
//     org: "ethermap",
//     type: "public",
//   })
//   .then(({ data }) => {
//     // handle data

//     console.log('what wow please just work ', data )
//   });


// https://docs.github.com/en/rest/repos/repos#list-organization-repositories

var org = 'ethermap'
var urlx = 'https://api.github.com/orgs/'+org+'/repos' 
var urlx2 = 'https://api.github.com/users/psytron'
// fetch( urlx )
// 		.then(response => response.json()) //Converting the response to a JSON object
// 		.then( data => 
// 		{ 
// 			console.log(data)
// 			for ( var i in data ){

// 				console.log( data[i].full_name )
// 			}
					   
// 		})
// 		.catch( error => console.error(error));


async function smallList(){
	return new Promise( (resolve,reject)=>{
		fetch( urlx )
			.then( response => response.json()) //Converting the response to a JSON object
			.then( (data )=> 
			{ 
				// console.log(data)
				// for ( var i in data ){
				//     console.log( data[i].full_name )
				// }
				resolve( data )
						   
			})
			.catch( ( error )=> 
			{
				console.error( error )
				console.log(' exc ')
			});
		
	})	
}

export { smallList }