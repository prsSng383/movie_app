//We are using appwrite to create Trending section in our app. 
// How? . User will search a movie we can store the movie in the db and the movie with the most number of searches 
// will be the Most trending one.

import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID ;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID ;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID ;

//Accessing your account and project from appwrite.
const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject(PROJECT_ID)

//Accessing the database we created in the appwrite.
const database = new Databases(client);

// This Fnc takes the moviename/searchterm , try to look it inside the DB and perform actions(update/create).
export const updateSearchCount = async (searchTerm , movie) =>{
    //1. Use Appwrite database to check if the search term(the name of the movie) exists in the database.
        
    try {
        const result = await database.listDocuments(DATABASE_ID , COLLECTION_ID ,[Query.equal('searchTerm' , searchTerm)])
        
        //2. If the movie/search term already exists in the db , update its count to count+1.
        if(result.documents.length > 0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID , COLLECTION_ID ,doc.$id ,{
                count : doc.count + 1,
            })

        //3. If not , create a new entry in the db for this movie with the count 1.
        }else{
              await database.createDocument(DATABASE_ID , COLLECTION_ID , ID.unique(),{
                searchTerm,
                count:1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              })
        }
    } catch (error) {
        console.error(error);
    }

    
}


//This Fnc helps to GET/FETCH the data fromt he appwrite DB , to show in the Trending Movie list.

export const getTrendingMovies = async()=>{
    try {
        const result = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
            Query.limit(5),
            Query.orderDesc("count")
        ])
           
        return result.documents ;

    } catch (error) {
        console.error(error)
    }
}