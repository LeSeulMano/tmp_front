<template>
  <section id="sect5">
    <div class="ajouter_cours">
      <h2>Ajouter un cours</h2>
      <form>
        <div class="form_body">
          <div class="form_body_select">
            <div>
              <label for="annee">Choississez une année</label>
              <select name="annee" v-model="year">
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div>
              <label for="promotion">Choississez un niveau</label>
              <select name="promotion" v-model="promotion">
                <option value="1A" selected>1A</option>
                <option value="2A">2A</option>
                <option value="3A">3A</option>
              </select>
            </div>
            <div>
              <label for="matiere">Choississez une matière</label>
              <select name="matiere" v-if="promotion == '1A'" v-model="matter">
                <option v-for="(matter, index) in first" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="promotion == '2A'" v-model="matter">
                <option v-for="(matter, index) in second" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'MT'" v-model="matter">
                <option v-for="(matter, index) in mt" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'ME'" v-model="matter">
                <option v-for="(matter, index) in me" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'AVM'" v-model="matter">
                <option v-for="(matter, index) in avm" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'ESE'" v-model="matter">
                <option v-for="(matter, index) in ese" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'GI'" v-model="matter">
                <option v-for="(matter, index) in gi" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'GM'" v-model="matter">
                <option v-for="(matter, index) in gm" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'ICY'" v-model="matter">
                <option v-for="(matter, index) in icy" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'Info'" v-model="matter">
                <option v-for="(matter, index) in info" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'GCB'" v-model="matter">
                <option v-for="(matter, index) in gcb" :key="index" :value="matter">{{ matter }}</option>
              </select>
              <select name="matiere" v-if="specialities == 'GEII'" v-model="matter">
                <option v-for="(matter, index) in geii" :key="index" :value="matter">{{ matter }}</option>
              </select>
            </div>
            <div>
              <label for="type">Choississez un type</label>
              <select name="type" v-model="type">
                <option value="CM" selected>CM</option>
                <option value="TD">TD</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div>
              <label for="teacher">Nom du chargé de cours</label>
              <input type="text" v-model="teacher" name="teacher">
            </div>
            <div>
              <label for="specialities">Choisissez la spétialité</label>
              <select name="specialities" v-model="specialities" :disabled="disableSelect">
                <option value="MT">MT</option>
                <option value="ME">ME</option>
                <option value="AVM">AVM</option>
                <option value="ESE">ESE</option>
                <option value="GM">GM</option>
                <option value="Info">Info</option>
                <option value="GCB">GCB</option>
                <option value="ICY">ICY</option>
                <option value="GI">GI</option>
                <option value="IIA">IIA</option>
                <option value="GEII">GEII</option>
              </select>
            </div>
          </div>
          <div id="drop-zone" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @click="handleClick"> {{ fileName || ' Faites glisser un fichier ici' }}</div>
          <input accept="application/pdf" type="file" ref="fileInput" id="file-input" name="file" style="display: none;" @change="handleFileChange">
          <div class="checkbox">
            <label for="conditions">Accepter les <router-link class="router-link" to="/cgu">Conditions Générales <ion-icon name="open"></ion-icon></router-link></label>
            <input type="checkbox" v-model="check" name="conditons">
          </div>
        </div>
        <div class="form_footer">
          <div class="btn btn-secondary btn-icon-backward">
            <router-link to="/cours" class="router-link">
              <IonIcon name="arrow-back"></IonIcon>
              <div>Retour</div>
            </router-link>
          </div>
          <div class="btn btn-primary btn-icon-forward btn-submit-cours pointer" @click="validate">
            <div>
              <div>Ajouter</div>
              <IonIcon name="add-circle"></IonIcon>
            </div>
          </div>
        </div>
      </form>
      <div class="sent">
        <h3>Votre demande d'ajout de cours a bien été envoyé ! <br> Elle sera vérifiée par un membre de l'équipe avant publication.</h3>
        <h3>Merci de participer à l'entretien des cours de Delmoo !</h3>
        <div class="btn btn-primary btn-icon-forward">
          <router-link class="router-link" to="/">
            <div>Retour à l'accueil</div>
            <IonIcon name="chevron-forward"></IonIcon>
          </router-link>
        </div>
      </div>
    </div>
    <ErrorModal :errorModalVisible="errorModalVisible" :message="errorMessage"
                @update:errorModalVisible="updateErrorModal"></ErrorModal>

    <SuccessModal :showModal="showModal"></SuccessModal>
  </section>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import {ref} from "vue";
import axios from "axios";
import ErrorModal from "@/components/modal/ErrorModal.vue";
import anime from "animejs";
import SuccessModal from "@/components/modal/SuccessModal.vue";
export default {
  components: {
    IonIcon,
    ErrorModal,
    SuccessModal
  },
  data(){
    const first = ["analyse", "algèbre", "outil mathématique", "algo", "électrostatique", "électrocinétique", "mécanique", "thermodynamique", "chimie des matériaux", "proba", "magnétostatique", "optique géométrique", "automatique"];
    const second = ["analyse", "algèbre", "algo", "base de donnée", "architecture", "électromagnétisme", "physique des ondes", "optique ondulatoire", "automatique", "calcul formel", "thermodynamique", "analyse numérique", "programmation orientée objet", "génie logiciel"];
    const mt = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const ese =["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const iia = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const geii = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const gm = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const info = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const icy = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const gi = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const gcb = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    const me = ["TDS", "C/python", "Electronique", "Electrotechnique", "Automatique", "Analyse", "RDM", "Mécanique", "Procédé", "Modélisation"];
    return {
      errorModalVisible: false,
      errorMessage: "",
      first,
      second,
      mt,
      me,
      ese,
      gi,
      gcb,
      icy,
      info,
      iia,
      geii,
      gm,
      promotion: '1A',
      specialities: '',
      fileName: null,
      year: "2023",
      matter: ref(''),
      type: "CM",
      teacher: '',
      file: null,
      check: '',
      showModal: false
    }
  },
  methods: {
    animateModal() {
      this.showModal = true;
      anime({
        targets: '.modal-content',
        scale: [0, 1],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 500,
        delay: 300,
        complete: () => {
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        },
      });
    },
    showErrorModal(message) {
      this.errorMessage = message;
      this.errorModalVisible = true;
      this.$nextTick(() => {
        anime({
          targets: this.$refs.overlay,
          opacity: 1,
          duration: 500,
        });
        anime({
          targets: ".error-modal",
          translateX: ["200%", "0%"],
          easing: 'easeOutElastic(.5, .3)',
          duration: 500
        });
      })
    },
    updateErrorModal(value) {
      this.errorModalVisible = value;
    },
    validate(){
      if (this.matter.length <= 0 || this.teacher <= 0 || this.file == null){
        this.showErrorModal("Champ manquant !")
        return;
      }
      if (this.promotion == "3A" && this.specialities.length <= 0) {
        this.showErrorModal("Veuillez saisir la spécialité concerné !")
        return;
      }
      if (this.check != true) {
        this.showErrorModal("Vous n'avez pas validé les Conditions générales")
        return;
      }
      const extension = "." + this.file.name.split(".").pop();
      axios.post('http://localhost:5000/cours/add', {
        file: this.file,
        year: this.year,
        matter: this.matter,
        teacher: this.teacher,
        promotion: this.promotion,
        type: this.type,
        name: this.file.name.slice(0, -extension.length)
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }, {
        validateStatus: function (status) {
          return status === 201 || status === 500 || status === 403;
        }
      }).then((res) => {
            if (res.status == 500 || res.status == 403) {
              this.showErrorModal(res.data.message);
              return;
            }
          this.animateModal()
      })
    },
    handleDragOver(event) {
      event.preventDefault();
      event.target.style.border = '2px solid #888';
    },
    handleDrop(event) {
      event.preventDefault();
      event.target.style.border = '2px dashed #ccc';
      this.handleFile(event.dataTransfer.files[0]);
    },
    handleClick() {
      this.$refs.fileInput.click();
    },
    handleFileChange() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];
      this.file = file;
      this.handleFile(file);
      fileInput.value = null;
    },
    handleFile(file) {
      if (file) {
        if (file.type === 'application/pdf') {
          this.fileName = file.name;
        } else {
          this.showErrorModal("Veuillez saisir un pdf !")
          this.fileName = null;
          this.file = null;
        }
      } else {
        this.fileName = null;
      }
    },
  },
  watch: {
    promotion(newPromotion) {
      if (newPromotion !== "3A") {
        this.specialities = "";
      } else {
        this.specialities = "MT";
      }
    }
  },
  computed: {
    disableSelect() {
      if (this.promotion == "1A" || this.promotion == "2A") {
        return true;
      }
      return false;
    }
  },
  mounted() {
    const screenHeight = window.innerHeight;
    document.querySelector('#sect5').style.height = screenHeight + "px";
  }
}
</script>

<style lang="scss">
@import "../../../utils/computer/variables.scss";

#sect5 {
  position: relative;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 101%;
    bottom: -0.5rem;
    background-image: url('../../../assets/wave4.svg');
    background-repeat: no-repeat;
    background-position-y: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .ajouter_cours {
    position: absolute;
    left: 50%;
    top: 12%;
    transform: translateX(-50%);

    // Effet Glass Morphism
    background:  rgba($color: $terciary-white, $alpha: .5); // rgba(35,35,35,0.5)
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color: $terciary-white, $alpha: .25);  //rgba(35,35,35,0.25)

    // Effet d'ombre
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    border-radius: $half-round;
    padding: 2.2rem 3rem 2rem 3rem;

    // Ligne sur le côté
    &:after, &:before {
      position: absolute;
      content:'';
      top: .5rem;
      width: 5px;
      background-color: $primary-red;
      transform: skewY(30deg);
    }
    &:after {
      left: -.9rem;
      height: 7rem;
    }
    &:before {
      left: -1.7rem;
      height: 4.7rem;
    }

    form, input, label {
      position: relative;
      display: block;
      border: none;
      outline: none;
    }

    h2 {
      position: relative;
      color: $primary-black;
      font-size: $h4-text;
      margin: 0;
      margin-bottom: 3.5rem;
      //text-align: center;

      &:after {
        position: absolute;
        content:'';
        top: calc(100% + .5rem);
        left: 0%;
        transform: translateX(-0%);
        height: 3px;
        width: 30%;
        background-color: $primary-red;
      }
    }

    // Lorsque le fichier a bien été envoyé, on cache le formulaire et on affiche le .sent
    .sent {
      display: none;

      h3 {
        font-size: $h6-text;
        color: $primary-black;
        font-weight: 600;
        text-align: center;
        margin-bottom: 2rem;
      }
      .btn {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    form {
      .form_body {
        margin-bottom: 2rem;

        label {
          font-size: $small-text;
          text-transform: uppercase;
          color: $primary-red;
          font-weight: 600;
          text-indent: .5rem;
        }
        input, select {
          font-size: $p-text;
          color: $primary-black;
          padding: .8rem 1rem;
          border-radius: $half-round;
          width: 14rem;

          &::placeholder {
            color: $secondary-black;
          }
        }
        .btn-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2.5rem;
        }

        .form_body_select {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin-bottom: 2rem;
        }

        #drop-zone {
          position: relative;
          width: 100%;
          height: 200px;
          border: 2px dashed $secondary-black;
          text-align: center;
          line-height: 200px;
          color: $secondary-black;
          border-radius: $half-round;
        }
        .checkbox {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;

          label {
            .router-link {
              position: relative;
              font-size: $small-text;
              color: $primary-red;

              &:after {
                position: absolute;
                content: '';
                width: 100%;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                height: 2px;
                background-color: $primary-red;
                transition: .4s;
              }
              &:hover::after {
                width: 50%;
              }

              ion-icon {
                position: relative;
                font-size: $small-text;
                color: inherit;
                top: .03rem;
              }
            }
          }
          input {
            position: relative;
            margin-left: 1.5rem;
            width: 1rem;
            height: 1rem;
            padding: 0;
            appearance: none;
            -webkit-appearance: none;
            top: -.17rem;

            &::before {
              position: absolute;
              content:'';
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: transparent;
              border: 2px solid $primary-black;
              border-radius: 4px;
              cursor: pointer;
            }
            &::after {
              position: absolute;
              content:'';
              top: 50%;
              left: 50%;
              transform: translate(-33%, -33%);
              height: 0;
              width: 0;
              background-color: $primary-black;
              border-radius: 2px;
              transition: .3s;
              cursor: pointer;
            }
            &:checked::after {
              width: 70%;
              height: 70%;
            }
          }

        }

      }

      .form_footer {
        display: flex;
        justify-content: space-between;
        align-self: center;
      }
    }





  }
}
</style>