const projects = [
    { 
        category: 'features', format: 'Documentary Feature', title: 'On Lavender', director: 'Makis Evangelatos - Eirini Chatzi', role: 'Writer, Director, Art Director, Producer', year: '2025', 
        description: 'On Lavender explores the multiplicities of gender identity in Greek society, weaving a tapestry of narratives that reflect the intricate complexities of identity in an evolving world. This debut feature is the result of a four-year effort and marks the first in-depth exploration of gender identity in Greece, primarily funded by its contributors.<br/>Director: Makis Evangelatos, Co-Director: Eirini Chatzi<br/>Mermaid Award Special Mention – Thessaloniki International Documentary Festival 2025', 
        type: 'video', image: '/assets/images/on-lavender.jpg', videoUrl: 'https://www.youtube.com/watch?v=YF3P54Z4dbY', alt: 'On Lavender documentary' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'Daimonio - Freaks', director: 'Makis Evangelatos - Stelios Dagkas', role: 'Co-Director, Colorist, Producer', year: '2026', 
        description: 'Official music video for Daimonio, an independent artist known for blending high-BPM electronic sounds, tekno, and DIY femme rap.<br/>Directed by: Makis Evangelatos, Stelios Dagkas', 
        type: 'video', image: '/assets/images/daimonio-freaks.jpg', videoUrl: 'https://www.youtube.com/watch?v=TDXsRpbVsA8', alt: 'Daimonio - Freaks music video' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'Animal Anatomy - Red Skin', director: '', role: 'Cinematographer, Colorist', year: '2026', 
        description: 'Official music video for Animal Anatomy.', 
        type: 'video', image: '/assets/images/animal-anatomy-red-skin.jpg', videoUrl: 'https://www.youtube.com/watch?v=JMeuGRJwOs4', alt: 'Animal Anatomy - Red Skin music video' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'Dolly Vara - Apetaxamin!', director: 'Makis Evangelatos', role: 'Director, Art Director, Colorist, Producer', year: '2026', 
        description: 'Official music video for a prominent hip-hop/rap single that blends dark, experimental rap elements with vivid, ritualistic imagery.<br/>Directed by: Makis Evangelatos', 
        type: 'video', image: '/assets/images/dolly-vara-apetaxamin.jpg', videoUrl: 'https://www.youtube.com/watch?v=bheMD7noE34', alt: 'Dolly Vara - Apetaxamin music video' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'Dolly Vara - Ta kala paidia', director: 'Makis Evangelatos', role: 'Director, Colorist, Producer', year: '2025', 
        description: 'Official music video for a dance/hip-hop track from Dolly Vara\'s debut album.<br/>Directed by: Makis Evangelatos', 
        type: 'video', image: '/assets/images/dolly-vara-ta-kala-paidia.jpg', videoUrl: 'https://www.youtube.com/watch?v=u7PAFePQyE0', alt: 'Dolly Vara - Ta kala paidia music video' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'Dolly Vara - Click Click', director: 'Makis Evangelatos', role: 'Director, Cinematographer, Colorist, Producer', year: '2024', 
        description: 'Official music video for a raw, high-energy queer rap and trap song from Dolly Vara\'s debut album.<br/>Directed by: Makis Evangelatos', 
        type: 'video', image: '/assets/images/dolly-vara-click-click.jpg', videoUrl: 'https://www.youtube.com/watch?v=0wJ6EvWpUQo', alt: 'Dolly Vara - Click Click music video' 
    },
    { 
        category: 'music', format: 'Music Video', title: 'N\'Cheezed - Skones', director: 'Eirini Chatzi', role: 'Cinematographer, Colorist, Producer', year: '2024', 
        description: 'Official music video for N\'Cheezed.<br/>Directed by: Eirini Chatzi', 
        type: 'video', image: '/assets/images/ncheezed-skones.png', videoUrl: 'https://www.youtube.com/watch?v=phRV5344Ldk', alt: 'N\'Cheezed - Skones music video' 
    },
    { 
        category: 'photography', format: 'Digital', title: 'COLAB - Dance performance', director: '', role: 'Photographer', year: '2026', 
        description: 'Set design and photography for a contemporary dance performance in Athens.', 
        type: 'photography', image: '/assets/images/colab.jpg', videoUrl: '', alt: '' 
    },
    { 
        category: 'photography', format: 'Digital', title: 'End of flowers', director: '', role: 'Photographer', year: '2024', 
        description: 'Portrait for performer / artist Reject aka LEX.', 
        type: 'photography', image: '/assets/images/reject.jpeg', videoUrl: '', alt: '' 
    },
    { 
        category: 'photography', format: 'Digital', title: 'Bruise pristine', director: '', role: 'Photographer', year: '2023', 
        description: 'Photography series.', 
        type: 'photography', image: '/assets/images/bruise-pristine-series.jpeg', videoUrl: '', alt: '' 
    },
];

const grid = document.querySelector('#project-grid');
const count = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-button');
const modal = document.querySelector('#media-modal');
const modalMedia = document.querySelector('#modal-media');
const modalTitle = document.querySelector('#modal-title');
const modalMetadata = document.querySelector('#modal-metadata');
const modalDescription = document.querySelector('#modal-description');
const closeModalButton = document.querySelector('.modal-close');
const previousProjectButton = document.querySelector('.modal-previous');
const nextProjectButton = document.querySelector('.modal-next');
const navLinks = document.querySelector('#nav-links');
const menuButton = document.querySelector('.menu-button');
const emailLink = document.querySelector('#email-link');
let lastFocusedElement;

const emailAddress = ['gerasimos', 'evangelatos87', 'gmail', 'com'];
const email = `${emailAddress[0]}${emailAddress[1]}@${emailAddress[2]}.${emailAddress[3]}`;
const emailAnchor = document.getElementById('email-link');
let activeCategory = 'all';
let visibleProjects = projects;
let currentProjectIndex = -1;
emailAnchor.href = `mailto:${email}`;
emailAnchor.textContent = email;

function getVideoMarkup(project) {
    const isLocalFile = window.location.protocol === 'file:';
    const watchLink = project.videoUrl;

    if (isLocalFile) {
    return `<p class="video-fallback">Video embeds require a hosted page. <a href="${watchLink}" target="_blank" rel="noopener noreferrer">Open ${project.title} in a new tab</a></p>`;
    }

    const videoUrl = new URL(project.videoUrl);
    const isYouTube = videoUrl.hostname.includes('youtube.com') || videoUrl.hostname === 'youtu.be';
    const videoId = videoUrl.hostname === 'youtu.be'
    ? videoUrl.pathname.slice(1)
    : videoUrl.searchParams.get('v');
    const embedUrl = isYouTube
    ? new URL(`https://www.youtube-nocookie.com/embed/${videoId}`)
    : new URL(`https://player.vimeo.com/video/${videoUrl.pathname.split('/').filter(Boolean).at(-1)}`);

    embedUrl.searchParams.set('autoplay', '1');
    embedUrl.searchParams.set('muted', '1');
    if (isYouTube) {
    embedUrl.searchParams.set('origin', window.location.origin);
    embedUrl.searchParams.set('playsinline', '1');
    }

    return `<iframe src="${embedUrl}" title="${project.title}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
}

function renderProjects(category) {
    activeCategory = category;
    visibleProjects = category === 'all'
    ? projects
    : projects.filter((project) => project.category === category);
    count.textContent = `${String(visibleProjects.length).padStart(2, '0')} projects`;
    grid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project" style="animation-delay: ${index * 55}ms">
        <button class="project-button" type="button" data-project="${projects.indexOf(project)}" aria-label="Open ${project.title}">
        <div class="project-media">
            <img src="${project.image}" alt="${project.alt}" loading="lazy">
            <span class="media-marker ${project.type}" aria-hidden="true">${project.type === 'video' ? '&#9654;' : '&#8599;'}</span>
        </div>
        <div class="project-info">
            <div><h3>${project.title}</h3><p>${project.format} / ${project.role}</p></div>
            <span class="project-year">${project.year}</span>
        </div>
        <p class="project-description">${project.description}</p>
        </button>
    </article>`).join('');
}

function updateModalNavigation() {
    previousProjectButton.disabled = currentProjectIndex <= 0;
    nextProjectButton.disabled = currentProjectIndex === visibleProjects.length - 1;
}

function openModal(project, trigger) {
    lastFocusedElement = trigger;
    currentProjectIndex = visibleProjects.indexOf(project);
    modalTitle.textContent = project.title;
    modalMetadata.textContent = `${project.format} / Role: ${project.role} / ${project.year}`;
    modalDescription.innerHTML = project.description;
    modalMedia.innerHTML = project.type === 'video'
    ? getVideoMarkup(project)
    : `<img src="${project.image}" alt="${project.alt}">`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    updateModalNavigation();
    closeModalButton.focus();
}

function showProjectAt(index) {
    if (!modal.classList.contains('is-open') || index < 0 || index >= visibleProjects.length) return;
    currentProjectIndex = index;
    const project = visibleProjects[currentProjectIndex];
    modalTitle.textContent = project.title;
    modalMetadata.textContent = `${project.format} / Role: ${project.role} / ${project.year}`;
    modalDescription.innerHTML = project.description;
    modalMedia.innerHTML = project.type === 'video'
    ? getVideoMarkup(project)
    : `<img src="${project.image}" alt="${project.alt}">`;
    updateModalNavigation();
}

function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalMedia.innerHTML = '';
    document.body.classList.remove('modal-open');
    currentProjectIndex = -1;
    lastFocusedElement?.focus();
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
    filterButtons.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    renderProjects(button.dataset.filter);
    });
});

grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('.project-button');
    if (trigger) openModal(projects[Number(trigger.dataset.project)], trigger);
});

closeModalButton.addEventListener('click', closeModal);
previousProjectButton.addEventListener('click', () => showProjectAt(currentProjectIndex - 1));
nextProjectButton.addEventListener('click', () => showProjectAt(currentProjectIndex + 1));
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') showProjectAt(currentProjectIndex - 1);
    if (event.key === 'ArrowRight') showProjectAt(currentProjectIndex + 1);
});

menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);
});
navLinks.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
});
window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('is-scrolled', window.scrollY > 12));

renderProjects('all');