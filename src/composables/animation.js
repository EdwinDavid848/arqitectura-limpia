import { ref, onMounted, onUnmounted } from "vue";

export function aparicionAbajo(){
    const isVisible0 = ref(false);
    const animatable = ref(null);


    const handleScroll2 = () => {
        if (!animatable.value) return;
    
        const rect = animatable.value.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            isVisible0.value = true;
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll2);
        handleScroll2();
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll2);
    });

    return { isVisible0, animatable }; // Retorna valores

}
/*
export function aparacionMultiple() {
  const animatables = ref([]);
  const isVisibles = ref([]);

  const handleScroll = () => {
    animatables.value.forEach((element, index) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          isVisibles.value[index] = true;
        }
      }
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    console.log("Animatables inicializado:", animatables.value);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { animatables, isVisibles };
}
  */