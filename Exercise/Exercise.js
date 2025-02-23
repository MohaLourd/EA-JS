// Función para obtener los datos de un usuario
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
    (response) => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    }
  );
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).then((response) => {
    if (!response.ok) throw new Error("Error al obtener los posts");
    return response.json();
  });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((response) => {
    if (!response.ok) throw new Error("Error al obtener comentarios del post");
    return response.json();
  });
}

console.log("Inicio");

getUser(6)
  .then((user) => getPosts(user.id))
  .then((posts) => {
    console.log("Posts del usuario:");
    posts.forEach((post) => console.log(`- ${post.title}`)); // forEach para imprimir títulos de posts

    return Promise.all(posts.map((post) => getComments(post.id))); // map para obtener comentarios
  })
  .then((commentsArray) => {
    const allComments = commentsArray.flat(); // Aplanamos el array de arrays de comentarios

    console.log("\nTodos los comentarios:");
    allComments.forEach((comment) =>
      console.log(`- ${comment.email}: ${comment.body}`)
    ); // forEach para imprimir comentarios

    // Filtrar comentarios que contienen la palabra "bueno"
    const filteredComments = allComments.filter((comment) =>
      comment.body.includes("bueno")
    );

    console.log("\nComentarios filtrados que contienen 'bueno':");
    filteredComments.forEach((comment) =>
      console.log(`- ${comment.email}: ${comment.body}`)
    );

    // Contar cuántos comentarios contienen más de 20 palabras
    const longCommentsCount = allComments.reduce(
      (count, comment) =>
        comment.body.split(" ").length > 20 ? count + 1 : count,
      0
    );

    console.log(
      "\nNúmero de comentarios con más de 20 palabras:",
      longCommentsCount
    );

    // Crear un nuevo array con solo emails de usuarios que comentaron
    const emailList = allComments.map((comment) => comment.email);
    console.log("\nLista de emails de usuarios que comentaron:", emailList);

    console.log("Fin");
  })
  .catch((error) => console.error("Error:", error));
