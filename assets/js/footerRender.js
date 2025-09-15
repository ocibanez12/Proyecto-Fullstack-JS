// footerRender
const footerContain = document.getElementById("footer-render");

const loadFooter = () => {
    const footerPath = '/assets/utils/footer.html';
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error('Error cargando footer');
            return response.text();
        })
        .then(html => {
            footerContain.innerHTML = html; //inserta el footer
        })
        .catch(err => {
            console.error("Error al cargar el footer:", err);
            footerContain.innerHTML = `<p>Error al cargar footer</p>`;
        });
};

loadFooter();
