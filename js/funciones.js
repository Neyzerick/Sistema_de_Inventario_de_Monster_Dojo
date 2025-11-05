let currentMainPage = 'home';
        let currentSubsections = {
            'marco-teorico': 'mt-intro',
            'analisis': 'an-problematica'
        };

        function showMainPage(pageId) {
            // Ocultar todas las páginas principales
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));

            // Remover clase active de todos los botones principales
            const buttons = document.querySelectorAll('.nav-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Mostrar la página seleccionada
            document.getElementById(pageId).classList.add('active');
            currentMainPage = pageId;

            // Activar el botón correspondiente
            event.target.classList.add('active');

            // Si la página tiene subsecciones, mostrar la última vista
            if (pageId === 'marco-teorico' || pageId === 'analisis') {
                showSubsection(currentSubsections[pageId]);
            }

            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showSubsection(subsectionId) {
            // Determinar a qué página pertenece esta subsección
            let parentPage;
            if (subsectionId.startsWith('mt-')) {
                parentPage = 'marco-teorico';
            } else if (subsectionId.startsWith('an-')) {
                parentPage = 'analisis';
            }

            // Ocultar todas las subsecciones de esa página
            const subsections = document.querySelectorAll(`#${parentPage} .subsection`);
            subsections.forEach(sub => sub.classList.remove('active'));

            // Remover clase active de todos los botones de subnavegación
            const subButtons = document.querySelectorAll(`#${parentPage} .subnav-btn`);
            subButtons.forEach(btn => btn.classList.remove('active'));

            // Mostrar la subsección seleccionada
            document.getElementById(subsectionId).classList.add('active');
            currentSubsections[parentPage] = subsectionId;

            // Activar el botón correspondiente
            event.target.classList.add('active');

            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
