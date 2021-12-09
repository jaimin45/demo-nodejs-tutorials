export const getUserList = () =>  {
  return [
        {
            id: 1,
            isPublic: true,
            name: 'tutorials',
            companies: ['com1', 'com2', 'com3'],
            books: [{
                name: 'tutorials1',
                length: 2,
            },
            {
                name: 'tutorials2',
                length: 200,
             }
        ]
     }, 
    {
            id: 2,
            isPublic: true,
            name: 'nodejsBySj',
            companies: ['com1', 'com2', 'com3'],
            books: [
                {
                    name: 'tutorials1',
                    length: 1,
                },
                {
                    name: 'tutorials2',
                    length: 200,
                }
           ]
      }
   ]
}
export const findUserById = (id) =>{
const users = getUserList()
   const userFound = users.filter((user) => {
        if (user.id === id) {
             return user
        }   
    });
   if(userFound.length>0){
        return userFound
    }
    return false

}