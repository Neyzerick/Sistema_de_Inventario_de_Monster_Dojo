// ============= MÓDULO: PREVIEW =============
        const PreviewModule = (() => {
            const previewModal = document.getElementById('previewModal');
            const previewOverlay = document.getElementById('previewOverlay');
            const previewIcon = document.getElementById('previewIcon');
            const previewTitle = document.getElementById('previewTitle');
            const previewSubtitle = document.getElementById('previewSubtitle');
            const previewContent = document.getElementById('previewContent');
            const previewFeatures = document.getElementById('previewFeatures');

            const previewData = {
                home: {
                    icon: '🏠',
                    title: 'Inicio',
                    subtitle: 'Página Principal',
                    content: 'Página principal con estadísticas del inventario, catálogo de juegos de mesa populares (Monopoly, Clue, Scrabble, etc.) y características destacadas del sistema de gestión.',
                    features: ['Estadísticas en tiempo real', 'Catálogo de juegos', 'Dashboard interactivo']
                },
                marco: {
                    icon: '📚',
                    title: 'Marco Teórico',
                    subtitle: 'Fundamentos del Proyecto',
                    content: 'Fundamentos teóricos completos del proyecto: introducción detallada, antecedentes históricos, objetivos generales y específicos, planteamiento y formulación del problema, propósito del estudio, metodología aplicada y marco conceptual.',
                    features: ['8 secciones completas', 'Referencias teóricas']
                },
                analisis: {
                    icon: '📊',
                    title: 'Análisis Estructurado',
                    subtitle: 'Modelado del Sistema',
                    content: 'Análisis detallado del sistema: descripción de la problemática, diagramas de contexto que muestran entidades externas, lista completa de acontecimientos del sistema, y modelos de comportamiento por niveles (DFD).',
                    features: ['Diagrama de contexto', 'Lista de eventos', 'Modelos multinivel']
                },
                objetos: {
                    icon: '🎯',
                    title: 'Orientado a Objetos',
                    subtitle: 'Diseño OO del Sistema',
                    content: 'Modelado orientado a objetos del sistema: diagrama Entidad-Relación para base de datos, diagramas UML completos (clases, casos de uso, secuencia, actividades), y modelo detallado de procesos de negocio.',
                    features: ['Modelo E-R', 'Diagramas UML', 'Procesos de negocio']
                },
                video: {
                    icon: '🎥',
                    title: 'Video Demostrativo',
                    subtitle: 'Demo en Acción',
                    content: 'Video completo con demostración práctica del sistema de inventarios de juegos de mesa en funcionamiento. Incluye tutorial de uso, características principales y casos de uso reales.',
                    features: ['Demo completa', 'Tutorial paso a paso', 'Casos de uso']
                },
                contacto: {
                    icon: '📞',
                    title: 'Contactos',
                    subtitle: 'Información de Contacto',
                    content: 'Información de contacto completa para consultas, soporte técnico y sugerencias: email, teléfono, ubicación física en La Paz, Bolivia, y enlaces a sitio web oficial.',
                    features: ['Email directo', 'Teléfono de soporte', 'Ubicación física']
                },
                'modelo-ambiental': {
                    icon: '🌍',
                    title: 'Modelo Ambiental',
                    subtitle: 'Análisis del Entorno del Sistema',
                    content: 'Documentación completa del modelo ambiental del sistema: declaración de propósitos, diagrama de contexto que muestra las entidades externas, y lista detallada de acontecimientos del sistema.',
                    features: ['Declaración de Propósitos', 'Diagrama de Contexto', 'Lista de Acontecimientos']
                },
                
                'modelo-comportamiento': {
                    icon: '🎯',
                    title: 'Modelo de Comportamiento',
                    subtitle: 'Funcionamiento Interno del Sistema',
                    content: 'Modelo detallado del comportamiento del sistema: diagrama general del sistema, niveles de DFD (Diagrama de Flujo de Datos), diccionario de datos completo y diagrama entidad-relación.',
                    features: ['Diagrama General', 'Niveles de DFD', 'Diccionario de Datos', 'Diagrama E-R']
                }
            };

            let currentHoverTimeout = null;

            const init = () => {
                const navItems = document.querySelectorAll('.nav-item[data-preview]');
                
                navItems.forEach(item => {
                    item.addEventListener('mouseenter', (e) => handleMouseEnter(e, item));
                    item.addEventListener('mouseleave', handleMouseLeave);
                });
            };

            const handleMouseEnter = (e, item) => {
                const navLink = item.querySelector('.nav-link');
                
                 // No mostrar preview si el botón está activo (ya seleccionado)
                if (navLink && navLink.classList.contains('active')) {
                return;
                }
                const previewKey = item.getAttribute('data-preview');

                // Delay para evitar mostrar preview al pasar rápidamente
                currentHoverTimeout = setTimeout(() => {
                    showPreview(previewKey);
                }, 300);
            };

            const handleMouseLeave = () => {
                if (currentHoverTimeout) {
                    clearTimeout(currentHoverTimeout);
                }
                hidePreview();
            };

            const showPreview = (key) => {
                const data = previewData[key];
                if (!data) return;

                previewIcon.textContent = data.icon;
                previewTitle.textContent = data.title;
                previewSubtitle.textContent = data.subtitle;
                previewContent.textContent = data.content;

                // Limpiar y agregar features
                previewFeatures.innerHTML = '';
                data.features.forEach(feature => {
                    const tag = document.createElement('span');
                    tag.className = 'preview-tag';
                    tag.textContent = feature;
                    previewFeatures.appendChild(tag);
                });

                previewOverlay.classList.add('active');
                previewModal.classList.add('active');
            };

            const hidePreview = () => {
                previewOverlay.classList.remove('active');
                previewModal.classList.remove('active');
            };

            return { init };
        })();

        // ============= MÓDULO: NAVEGACIÓN =============
        const NavigationModule = (() => {
            const navLinks = document.querySelectorAll('.nav-link[data-page]');
            const pages = document.querySelectorAll('.page');

            const init = () => {
                navLinks.forEach(link => {
                    link.addEventListener('click', handleNavClick);
                });
                
                // Manejo de sub-parent links (que abren sub-submenú)
                const subParentLinks = document.querySelectorAll('.sub-parent[data-page]');
                subParentLinks.forEach(link => {
                    link.addEventListener('click', handleSubParentClick);
                });
                
                // Manejo de sub-sub-links
                const subSubLinks = document.querySelectorAll('.sub-sub-link');
                subSubLinks.forEach(link => {
                    link.addEventListener('click', handleSubSubLinkClick);
                });
            };

            // Manejar clic en sub-parent (ej: Modelo Ambiental)
            function handleSubParentClick(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const link = e.currentTarget;
                const pageId = link.getAttribute('data-page');
                
                // Toggle sub-sub-menu
                const subSubMenu = link.nextElementSibling;
                const isExpanded = link.classList.contains('expanded');
                
                // Cerrar todos los sub-sub-menús primero
                document.querySelectorAll('.sub-parent').forEach(l => {
                    l.classList.remove('expanded');
                });
                document.querySelectorAll('.sub-sub-menu').forEach(s => {
                    s.classList.remove('open');
                });
                
                // Abrir el actual si no estaba expandido
                if (!isExpanded) {
                    link.classList.add('expanded');
                    subSubMenu.classList.add('open');
                    
                    // Marcar el item padre como activo
                    const parentNavItem = link.closest('.nav-item');
                    const parentNavLink = parentNavItem.querySelector('.nav-link');
                    navLinks.forEach(l => l.classList.remove('active'));
                    parentNavLink.classList.add('active');
                    
                    // Mostrar la página principal del modelo
                    showPage(pageId);
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }

            // Manejar clic en sub-sub-link (ej: Declaración de Propósitos)
            function handleSubSubLinkClick(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const link = e.currentTarget;
                const pageId = link.getAttribute('data-page');
                const sectionId = link.getAttribute('data-section');
                
                // Marcar el item padre como activo
                const parentNavItem = link.closest('.nav-item');
                const parentNavLink = parentNavItem.querySelector('.nav-link');
                navLinks.forEach(l => l.classList.remove('active'));
                parentNavLink.classList.add('active');
                
                // Mostrar la página
                showPage(pageId);
                
                // Esperar a que se cargue la página y luego hacer scroll a la sección
                setTimeout(() => {
                    scrollToSection(sectionId);
                }, 100);
            }

            // Función para hacer scroll a una sección específica
            function scrollToSection(sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Efecto visual de highlight
                    section.style.transition = 'all 0.3s ease';
                    section.style.transform = 'scale(1.02)';
                    section.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
                    
                    setTimeout(() => {
                        section.style.transform = 'scale(1)';
                        section.style.boxShadow = '';
                    }, 500);
                }
            }

            const handleNavClick = (e) => {
                e.preventDefault();
                const link = e.currentTarget;
                
                // Remove active from all links
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Handle submenu toggle
                toggleSubmenu(link);
                
                // Close all sub-sub-menus
                document.querySelectorAll('.sub-parent').forEach(l => {
                    l.classList.remove('expanded');
                });
                document.querySelectorAll('.sub-sub-menu').forEach(s => {
                    s.classList.remove('open');
                });
                
                // Show page
                const pageId = link.getAttribute('data-page');
                showPage(pageId);
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            const toggleSubmenu = (link) => {
                const parent = link.parentElement;
                const subMenu = parent.querySelector('.sub-menu');
                
                if (subMenu) {
                    const isExpanded = link.classList.contains('expanded');
                    
                    // Close all submenus
                    document.querySelectorAll('.nav-link').forEach(l => {
                        l.classList.remove('expanded');
                    });
                    document.querySelectorAll('.sub-menu').forEach(s => {
                        s.classList.remove('open');
                    });
                    
                    // Toggle current submenu
                    if (!isExpanded) {
                        link.classList.add('expanded');
                        subMenu.classList.add('open');
                    }
                }
            };

            const showPage = (pageId) => {
                pages.forEach(p => p.classList.remove('active'));
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                }
            };

            return { init, showPage, scrollToSection };
        })();

        // ============= MÓDULO: SUB-NAVEGACIÓN =============
        const SubNavigationModule = (() => {
            const subLinks = document.querySelectorAll('.sub-link');

            const init = () => {
                subLinks.forEach(link => {
                    link.addEventListener('click', handleSubLinkClick);
                });
            };

            const handleSubLinkClick = (e) => {
                e.preventDefault();
                const sectionId = e.currentTarget.getAttribute('data-section');
                scrollToSection(sectionId);
            };

            const scrollToSection = (sectionId) => {
                const section = document.getElementById(sectionId);
                
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    highlightSection(section);
                }
            };

            const highlightSection = (section) => {
                section.style.transition = 'all 0.3s ease';
                section.style.transform = 'scale(1.02)';
                section.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
                
                setTimeout(() => {
                    section.style.transform = 'scale(1)';
                    section.style.boxShadow = '';
                }, 500);
            };

            return { init };
        })();

        // ============= MÓDULO: SIDEBAR =============
        const SidebarModule = (() => {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const toggleBtn = document.getElementById('sidebarToggle');
            let isHidden = false;

            const init = () => {
                // No need to add event listener here since we use onclick in HTML
            };

            const toggle = () => {
                isHidden = !isHidden;
                
                if (isHidden) {
                    sidebar.classList.add('hidden');
                    mainContent.classList.add('expanded');
                    toggleBtn.innerHTML = '☰';
                } else {
                    sidebar.classList.remove('hidden');
                    mainContent.classList.remove('expanded');
                    toggleBtn.innerHTML = '✕';
                }
            };

            return { init, toggle };
        })();

        // ============= MÓDULO: UTILIDADES =============
        const UtilsModule = (() => {
            const smoothScrollSidebar = () => {
                const sidebar = document.querySelector('.sidebar');
                let isDown = false;
                let startY;
                let scrollTop;

                sidebar.addEventListener('mousedown', (e) => {
                    isDown = true;
                    startY = e.pageY - sidebar.offsetTop;
                    scrollTop = sidebar.scrollTop;
                });

                sidebar.addEventListener('mouseleave', () => {
                    isDown = false;
                });

                sidebar.addEventListener('mouseup', () => {
                    isDown = false;
                });

                sidebar.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const y = e.pageY - sidebar.offsetTop;
                    const walk = (y - startY) * 2;
                    sidebar.scrollTop = scrollTop - walk;
                });
            };
         

            return { smoothScrollSidebar };
        })();
           // ============= MÓDULO: IMAGE LIGHTBOX =============
        const ImageLightboxModule = (() => {
            const lightbox = document.getElementById('imageLightbox');
            const lightboxImage = document.getElementById('lightboxImage');
            const imageContainer = document.getElementById('imageContainer');
            const zoomLevelDisplay = document.getElementById('zoomLevel');
            
            let currentZoom = 1;
            let isDragging = false;
            let startX, startY, scrollLeft, scrollTop;

            const init = () => {
                // Agregar event listeners a todas las imágenes
                const images = document.querySelectorAll('.image-placeholder img');
                images.forEach(img => {
                    img.addEventListener('click', () => openLightbox(img));
                });

                // Cerrar con tecla ESC
                document.addEventListener('keydown', (e) => {
                    if (lightbox.classList.contains('active')) {
                        if (e.key === 'Escape') {
                            closeLightbox();
                        }
                        // Zoom con + y -
                        if (e.key === '+' || e.key === '=') {
                            zoomIn();
                        }
                        if (e.key === '-' || e.key === '_') {
                            zoomOut();
                        }
                        // Reset con 0
                        if (e.key === '0') {
                            resetZoom();
                        }
                    }
                });

                // Cerrar al hacer clic en el fondo
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });

                // Zoom con rueda del mouse
                imageContainer.addEventListener('wheel', handleWheel, { passive: false });

                // Drag to scroll
                imageContainer.addEventListener('mousedown', startDragging);
                imageContainer.addEventListener('mousemove', drag);
                imageContainer.addEventListener('mouseup', stopDragging);
                imageContainer.addEventListener('mouseleave', stopDragging);
            };

            const openLightbox = (img) => {
                lightboxImage.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                currentZoom = 1;
                updateZoom();
                
                // Resetear scroll al centro
                setTimeout(() => {
                    imageContainer.scrollTop = 0;
                    imageContainer.scrollLeft = 0;
                }, 100);
            };

            const handleWheel = (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (e.deltaY < 0) {
                        zoomIn();
                    } else {
                        zoomOut();
                    }
                }
            };

            const startDragging = (e) => {
                if (currentZoom > 1) {
                    isDragging = true;
                    imageContainer.style.cursor = 'grabbing';
                    startX = e.pageX - imageContainer.offsetLeft;
                    startY = e.pageY - imageContainer.offsetTop;
                    scrollLeft = imageContainer.scrollLeft;
                    scrollTop = imageContainer.scrollTop;
                }
            };

            const drag = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - imageContainer.offsetLeft;
                const y = e.pageY - imageContainer.offsetTop;
                const walkX = (x - startX) * 2;
                const walkY = (y - startY) * 2;
                imageContainer.scrollLeft = scrollLeft - walkX;
                imageContainer.scrollTop = scrollTop - walkY;
            };

            const stopDragging = () => {
                isDragging = false;
                if (currentZoom > 1) {
                    imageContainer.style.cursor = 'grab';
                } else {
                    imageContainer.style.cursor = 'default';
                }
            };

            const updateZoom = () => {
                lightboxImage.style.transform = `scale(${currentZoom})`;
                zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
                
                if (currentZoom > 1) {
                    imageContainer.style.cursor = 'grab';
                } else {
                    imageContainer.style.cursor = 'default';
                }
            };

            return { init, updateZoom };
        })();

        // ============= FUNCIONES GLOBALES =============
        // ============= FUNCIONES GLOBALES =============
        let currentZoom = 1;

        function closeLightbox() {
            const lightbox = document.getElementById('imageLightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            currentZoom = 1;
            updateZoomDisplay();
        }

        function zoomIn() {
            if (currentZoom < 3) {
                currentZoom += 0.25;
                updateZoomDisplay();
            }
        }

        function zoomOut() {
            if (currentZoom > 0.5) {
                currentZoom -= 0.25;
                updateZoomDisplay();
            }
        }

        function resetZoom() {
            currentZoom = 1;
            updateZoomDisplay();
            // Centrar la imagen
            const container = document.getElementById('imageContainer');
            container.scrollLeft = 0;
            container.scrollTop = 0;
        }

        function updateZoomDisplay() {
            const image = document.getElementById('lightboxImage');
            const zoomLevel = document.getElementById('zoomLevel');
            const container = document.getElementById('imageContainer');
            
            image.style.transform = `scale(${currentZoom})`;
            zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
            
            if (currentZoom > 1) {
                container.style.cursor = 'grab';
            } else {
                container.style.cursor = 'default';
            }
        }

        /// ============= INICIALIZACIÓN =============
        document.addEventListener('DOMContentLoaded', () => {
            PreviewModule.init();
            NavigationModule.init();
            SubNavigationModule.init();
            SidebarModule.init();
            UtilsModule.smoothScrollSidebar();
            ImageLightboxModule.init();
        });
        // ===================== TEMA CLARO/OSCURO =====================
function toggleTheme() {
  const body = document.body;
  const themeButton = document.getElementById("themeToggle");
  // Efecto visual del botón
themeButton.classList.add("animate");
setTimeout(() => themeButton.classList.remove("animate"), 600);

  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    themeButton.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    themeButton.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
}

// Cargar el tema guardado
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const themeButton = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeButton.textContent = "☀️";
  } else {
    body.classList.remove("light-mode");
    themeButton.textContent = "🌙";
  }
});
