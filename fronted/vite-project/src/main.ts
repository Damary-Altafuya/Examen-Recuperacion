import './style.css';
interface ITVShow {
  id: number;
  code: string;
  name: string;
  director: string;
  investment: number;
  cast: string;
  version: number;
}

let tvShows: ITVShow[] = [
  {
    id: 1,
    code: 'tv001',
    name: 'Show 1',
    director: 'Director 1',
    investment: 1000000,
    cast: 'Actor 1, Actress 1',
    version: 1,
  },
  {
    id: 2,
    code: 'tv002',
    name: 'Show 2',
    director: 'Director 2',
    investment: 1500000,
    cast: 'Actor 2, Actress 2',
    version: 1,
  },
  {
    id: 3,
    code: 'tv003',
    name: 'Show 3',
    director: 'Director 3',
    investment: 1200000,
    cast: 'Actor 3, Actress 3',
    version: 1,
  },
  {
    id: 4,
    code: 'tv004',
    name: 'Show 4',
    director: 'Director 4',
    investment: 800000,
    cast: 'Actor 4, Actress 4',
    version: 1,
  },
  {
    id: 5,
    code: 'tv005',
    name: 'Show 5',
    director: 'Director 5',
    investment: 2000000,
    cast: 'Actor 5, Actress 5',
    version: 1,
  },
  {
    id: 6,
    code: 'tv006',
    name: 'Show 6',
    director: 'Director 6',
    investment: 1800000,
    cast: 'Actor 6, Actress 6',
    version: 1,
  },
  {
    id: 7,
    code: 'tv007',
    name: 'Show 7',
    director: 'Director 7',
    investment: 1300000,
    cast: 'Actor 7, Actress 7',
    version: 1,
  },
  {
    id: 8,
    code: 'tv008',
    name: 'Show 8',
    director: 'Director 8',
    investment: 900000,
    cast: 'Actor 8, Actress 8',
    version: 1,
  },
  {
    id: 9,
    code: 'tv009',
    name: 'Show 9',
    director: 'Director 9',
    investment: 1600000,
    cast: 'Actor 9, Actress 9',
    version: 1,
  },
  {
    id: 10,
    code: 'tv010',
    name: 'Show 10',
    director: 'Director 10',
    investment: 1200000,
    cast: 'Actor 10, Actress 10',
    version: 1,
  },
];

(async () => {
  const renderTable = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tvshows');
      const data = await response.json();

      let divTable2 = `<div class="table-container">`;
      divTable2 += `<h1> Tabla Arreglo </h1>`;
      divTable2 += `<table>`;
      divTable2 += `<tr><th>Code</th><th>Name</th><th>Director</th><th>Investment</th><th>Cast</th><th>Version</th><th>Actions</th></tr>`;

      tvShows.forEach((tvShow: ITVShow) => {
        divTable2 += `
              <tr>
                  <td>${tvShow.code}</td>
                  <td>${tvShow.name}</td>
                  <td>${tvShow.director}</td>
                  <td>${tvShow.investment}</td>
                  <td>${tvShow.cast}</td>
                  <td>${tvShow.version}</td>
                  <td>
                      <button class="btn btn-delete-html" data-id="${tvShow.id}">Eliminar</button>
                  </td>
              </tr>`;
      });

      divTable2 += `</table>`;
      divTable2 += `</div>`;

      document.querySelector<HTMLDivElement>('#app')!.innerHTML = divTable2;
      let divTable = `<table>`;
      divTable += `<h1> Tabla Database </h1>`;
      divTable += `<tr><th>Code</th><th>Name</th><th>Director</th><th>Investment</th><th>Cast</th><th>Version</th><th>Actions</th></tr>`;
      data.forEach((tvShow: ITVShow) => {
        divTable += `
          <tr>
            <td>${tvShow.code}</td>
            <td>${tvShow.name}</td>
            <td>${tvShow.director}</td>
            <td>${tvShow.investment}</td>
            <td>${tvShow.cast}</td>
            <td>${tvShow.version}</td>
            <td>
              <button class="btn btn-retornar" data-id="${tvShow.id}">Retornar</button>
            </td>
          </tr>`;
      });

      divTable += `</table>`;

      document.querySelector<HTMLDivElement>('#app')!.innerHTML += divTable;

      document.querySelectorAll<HTMLButtonElement>('.btn-retornar').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (id) {
            const returnedTVShow = data.find((tvShow: ITVShow) => tvShow.id === parseInt(id));
            tvShows.push(returnedTVShow);
            try {
              const response = await fetch(`http://localhost:3000/api/tvshows/${id}`, {
                method: 'DELETE',
              });
              const result = await response.json();
              await renderTable();
              console.log(result);
            } catch (error) {
              console.error('Error al eliminar el programa de televisión del servidor:', error);
            }
          } else {
            console.error('No se pudo obtener el ID del botón.');
          }
        });
      });
      
      
      document.querySelectorAll<HTMLButtonElement>('.btn-delete-html').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (id) {
            const deletedTVShow = tvShows.find((tvShow: ITVShow) => tvShow.id === parseInt(id));
            tvShows = tvShows.filter((tvShow: ITVShow) => tvShow.id !== parseInt(id));
            try {
              const response = await fetch('http://localhost:3000/api/tvshows', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(deletedTVShow),
              });
              const result = await response.json();
              await renderTable(); 
              console.log(result);
            } catch (error) {
              console.error('Error al enviar el programa de televisión eliminado al servidor:', error);
            }
          } else {
            console.error('No se pudo obtener el ID del botón.');
          }
        });
      });
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
    }
  };

  await renderTable();
})();
