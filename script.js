      // Mobile Menu Toggle
      const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
      const mainNav = document.getElementById("main-nav");

      mobileMenuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        const icon = mobileMenuToggle.querySelector("i");
        if (mainNav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });

      // Smooth scrolling for navigation links
      document
        .querySelectorAll("nav a, .cta-button, .btn")
        .forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
              e.preventDefault();
              const targetId = this.getAttribute("href");
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: "smooth",
                });

                // Close mobile menu if open
                if (mainNav.classList.contains("active")) {
                  mainNav.classList.remove("active");
                  const icon = mobileMenuToggle.querySelector("i");
                  icon.classList.remove("fa-times");
                  icon.classList.add("fa-bars");
                }
              }
            }
          });
        });

      // Active navigation link highlighting
      window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");

        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });

      // Back to Top Button
      const backToTopButton = document.getElementById("back-to-top");

      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("active");
        } else {
          backToTopButton.classList.remove("active");
        }
      });

      backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Form submission handlers
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          // In a real application, you would send the form data to a server here
          alert("Thank you for your message! We will get back to you soon.");
          this.reset();
        });
      }

      // Program Details Modal
      const programModal = document.getElementById("program-modal");
      const closeModal = document.getElementById("close-modal");
      const modalProgramTitle = document.getElementById("modal-program-title");
      const modalProgramContent = document.getElementById(
        "modal-program-content"
      );
      const programDetailsButtons = document.querySelectorAll(
        ".program-details-btn"
      );
      const modalApplyBtn = document.getElementById("modal-apply-btn");

      // Program details data
      const programDetails = {
        "Certificate in Community Health": {
          title: "Certificate in Community Health",
          content:
            "<p>This program provides comprehensive training in community health practices, preparing students for roles in primary healthcare settings.</p><p><strong>Duration:</strong> 2 years</p><p><strong>Requirements:</strong> 5 O'Level credits including English, Mathematics, Biology, Chemistry, and Physics</p><p><strong>Career Opportunities:</strong> Community Health Officer, Health Educator, Public Health Worker</p>",
        },
        "Diploma in Community Health": {
          title: "Diploma in Community Health",
          content:
            "<p>Advanced training for health professionals seeking specialization in community health and public health practices.</p><p><strong>Duration:</strong> 18 months</p><p><strong>Requirements:</strong> Certificate in Community Health or equivalent qualification</p><p><strong>Career Opportunities:</strong> Senior Community Health Officer, Public Health Supervisor, Health Program Coordinator</p>",
        },
        "Other Health Programs": {
          title: "Other Health Programs",
          content:
            "<p>We offer various short courses and specialized training programs for healthcare professionals.</p><p><strong>Examples:</strong></p><ul><li>Basic Life Support (BLS) Certification</li><li>Infection Prevention and Control</li><li>Health Information Management</li><li>Medical Laboratory Techniques</li></ul><p>Contact us for more information about our short courses and specialized programs.</p>",
        },
      };

      programDetailsButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const programName = button.getAttribute("data-program");
          const program = programDetails[programName];

          if (program) {
            modalProgramTitle.textContent = program.title;
            modalProgramContent.innerHTML = program.content;
            programModal.classList.add("active");
          }
        });
      });

      closeModal.addEventListener("click", () => {
        programModal.classList.remove("active");
      });

      // Application Modal
      const applicationModal = document.getElementById("application-modal");
      const closeApplicationModal = document.getElementById(
        "close-application-modal"
      );
      const applyNowBtn = document.getElementById("apply-now-btn");
      const modalApplyButton = document.getElementById("modal-apply-btn");

      applyNowBtn.addEventListener("click", () => {
        applicationModal.classList.add("active");
      });

      modalApplyBtn.addEventListener("click", () => {
        programModal.classList.remove("active");
        applicationModal.classList.add("active");
      });

      closeApplicationModal.addEventListener("click", () => {
        applicationModal.classList.remove("active");
      });

      // Close modals when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === programModal) {
          programModal.classList.remove("active");
        }
        if (e.target === applicationModal) {
          applicationModal.classList.remove("active");
        }
      });

      // Animated counter for stats
      const statNumbers = document.querySelectorAll(".stat-count");

      const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          element.textContent = value;
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const count = parseInt(entry.target.getAttribute("data-count"));
            animateValue(entry.target, 0, count, 2000);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      statNumbers.forEach((stat) => {
        observer.observe(stat);
      });