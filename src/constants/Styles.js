const isMobile = window.innerWidth <= 500;


const Styles = {
   largeText: {
      fontSize: isMobile ? "1rem" : "2.5rem"
   }
};

export default Styles;


// const styles = StyleSheet.create({
//    exerciseContent: {
//       width: 100 * vw,
//       height: 100 * vh
//    }
// });