document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")
  const mainContent = document.getElementById("main-content")

  function completeLoading() {
    loadingScreen.classList.add("fade-out")

    setTimeout(() => {
      loadingScreen.style.display = "none"
      mainContent.classList.add("show")
      document.body.style.overflow = "auto"

      // Mostrar navegación después de la transición
      setTimeout(() => {
        showNavigation()
        initMobileMenu()
        initSlider()
        initContactForm()
      }, 300)
    }, 800)
  }

  // Completar carga después de la animación
  setTimeout(() => {
    completeLoading()
  }, 4000) // 4 segundos total

  // Mostrar navegación después de la carga
  function showNavigation() {
    const navbar = document.getElementById("navbar")
    navbar.classList.add("show")
  }

  // Funcionalidad del menú hamburguesa
  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("nav-menu")
    const navContent = document.querySelector(".nav-content")

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")

      // Prevenir scroll del body cuando el menú está abierto
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    })

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    })

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Funcionalidad del slider automático
  function initSlider() {
    const slidesWrapper = document.getElementById("slides-wrapper")
    const slides = document.querySelectorAll(".slide")
    const dots = document.querySelectorAll(".dot")

    let currentSlide = 0
    const totalSlides = slides.length

    function updateSlider() {
      // Actualizar posición del slider
      slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`

      // Actualizar clases activas
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide)
      })

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    }

    // Auto-play cada 3.3 segundos
    setInterval(nextSlide, 3300)
  }

  // Funcionalidad del formulario de contacto
  function initContactForm() {
    const form = document.getElementById("contact-form")
    const submitBtn = form.querySelector(".form-submit")
    const submitText = submitBtn.querySelector(".submit-text")
    const submitLoading = submitBtn.querySelector(".submit-loading")

    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Mostrar estado de carga
      submitBtn.disabled = true
      submitText.style.display = "none"
      submitLoading.style.display = "inline"

      // Simular envío (aquí conectarías con tu backend)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar éxito
      submitText.textContent = "¡Mensaje enviado!"
      submitText.style.display = "inline"
      submitLoading.style.display = "none"
      submitBtn.style.background = "#4ade80"

      // Resetear formulario
      form.reset()

      // Restaurar botón después de 3 segundos
      setTimeout(() => {
        submitBtn.disabled = false
        submitText.textContent = "Enviar mensaje"
        submitBtn.style.background = ""
      }, 3000)
    })
  }

  // Smooth scroll para navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
