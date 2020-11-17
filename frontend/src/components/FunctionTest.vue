<template>
  <div>
    <h1>Funktionstest</h1>
    <div class="clearfix">
      <div class="set-size charts-container">
        <div class="pie-wrapper progress-100" v-on:click="show(1)">
          <span class="label">100<span class="smaller">%</span></span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <p class="type">Bücher</p>
        </div>
        <div class="pie-wrapper progress-100" v-on:click="show(2)">
          <span class="label">100<span class="smaller">%</span></span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <p class="type">Zeitschrifen</p>
        </div>
        <div class="pie-wrapper progress-100" v-on:click="show(3)">
          <span class="label">100<span class="smaller">%</span></span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <p class="type">Webseiten</p>
        </div>
        <div class="pie-wrapper progress-90" v-on:click="show(4)">
          <span class="label">80<span class="smaller">%</span></span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <p class="type">Quellcode</p>
        </div>
        <div class="pie-wrapper progress-30" v-on:click="show(5)">
          <span class="label">30<span class="smaller">%</span></span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <p class="type">Dateiformate</p>
        </div>
      </div>
    </div>
    <div class="info" v-if="active === 1">
      <hr />
      <h2>Test: Bücher</h2>
      <table>
        <thead>
          <td>Datum</td>
          <td>Verlag</td>
          <td>Status</td>
        </thead>
        <tr>
          <td>24.08.2020</td>
          <td>Springer</td>
          <td>Fehler</td>
        </tr>
        <tr>
          <td>24.08.2020</td>
          <td>Google Books</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Springer</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Google Books</td>
          <td>Ok</td>
        </tr>
      </table>
    </div>
    <div class="info" v-if="active === 2">
      <hr />
      <h2>Test: Zeitschriften</h2>
      <table>
        <thead>
          <td>Datum</td>
          <td>Verlag</td>
          <td>Status</td>
        </thead>
        <tr>
          <td>24.08.2020</td>
          <td>MISQ</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>24.08.2020</td>
          <td>Nature</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>BISE</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Information System Research</td>
          <td>Ok</td>
        </tr>
      </table>
    </div>
    <div class="info" v-if="active === 3">
      <hr />
      <h2>Test: Webseiten</h2>
      <table>
        <thead>
          <td>Datum</td>
          <td>Verlag</td>
          <td>Status</td>
        </thead>
        <tr>
          <td>24.08.2020</td>
          <td>Wikipedia</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>24.08.2020</td>
          <td>Spiegel</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Wikipedia</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Information System Research</td>
          <td>Ok</td>
        </tr>
      </table>
    </div>
    <div class="info" v-if="active === 4">
      <hr />
      <h2>Test: Quellcode</h2>
      <table>
        <thead>
          <td>Datum</td>
          <td>Verlag</td>
          <td>Status</td>
        </thead>
        <tr>
          <td>24.08.2020</td>
          <td>Github</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>24.08.2020</td>
          <td>Bitbucket</td>
          <td>Ok</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>Gitlab</td>
          <td>Ok</td>
        </tr>
      </table>
    </div>
    <div class="info" v-if="active === 5">
      <hr />
      <h2>Test: Quellcode</h2>
      <table>
        <thead>
          <td>Datum</td>
          <td>Verlag</td>
          <td>Status</td>
        </thead>
        <tr>
          <td>24.08.2020</td>
          <td>.pdf</td>
          <td>Fehler</td>
        </tr>
        <tr>
          <td>24.08.2020</td>
          <td>.docx</td>
          <td>Fehler</td>
        </tr>
        <tr>
          <td>23.08.2020</td>
          <td>.odt</td>
          <td>Ok</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class FunctionTest extends Vue {
  private active = 0;

  show(i: number) {
    if (i === this.active) this.active = 0;
    else this.active = i;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
td {
  font-size: 1.2em;
  vertical-align: top;
  border-top: 2px solid;
  border-color: #2c3e50;
  padding: 5px 0px 5px 1px;
}
table {
  width: 100%;
}
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}
@import url(https://fonts.googleapis.com/css?family=Lato:700);

// -- vars
$bg-color: #34495e;
$default-size: 0.9em;
$label-font-size: $default-size / 4;
$label-font-size-redo: $default-size * 4;

// -- mixins
@mixin size($width, $height) {
  height: $height;
  width: $width;
}

@mixin draw-progress($progress, $color) {
  .pie {
    .half-circle {
      border-color: $color;
    }

    .left-side {
      transform: rotate($progress * 3.6deg);
    }

    @if $progress <= 50 {
      .right-side {
        display: none;
      }
    } @else {
      clip: rect(auto, auto, auto, auto);

      .right-side {
        transform: rotate(180deg);
      }
    }
  }
}

@mixin draw-progress--solid($progress, $color, $bg-color) {
  background: linear-gradient(to right, $color 50%, $bg-color 50%);

  &:before {
    @if $progress <= 50 {
      background: $bg-color;
      transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
    } @else {
      background: $color;
      transform: rotate((100 - $progress) / 100 * 360deg);
    }
  }
}

// -- selectors
*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  background: #ecf0f1;
  color: #444;
  font-family: 'Lato', Tahoma, Geneva, sans-serif;
  font-size: 16px;
  padding: 10px;
}

.set-size {
  font-size: 10em;
  height: 200px;
  overflow: auto;
}

.type {
  font-size: 15pt;
  text-align: center;
  margin-top: 160px;
}
.charts-container {
  &:after {
    clear: both;
    content: '';
    display: table;
  }
}

.pie-wrapper {
  @include size($default-size, $default-size);
  float: left;
  margin: 15px;
  margin-left: 65px;
  margin-right: 65px;
  position: relative;
  cursor: pointer;

  .pie {
    @include size(100%, 100%);
    clip: rect(0, $default-size, $default-size, $default-size / 2);
    left: 0;
    position: absolute;
    top: 0;

    .half-circle {
      @include size(100%, 100%);
      border: ($default-size / 10) solid #3498db;
      border-radius: 50%;
      clip: rect(0, $default-size / 2, $default-size, 0);
      left: 0;
      position: absolute;
      top: 0;
    }
  }

  .label {
    background: $bg-color;
    border-radius: 50%;
    bottom: $label-font-size-redo / 10;
    color: #ecf0f1;
    cursor: default;
    display: block;
    font-size: $label-font-size;
    left: $label-font-size-redo / 10;
    line-height: $label-font-size-redo * 0.7;
    position: absolute;
    right: $label-font-size-redo / 10;
    text-align: center;
    top: $label-font-size-redo / 10;

    .smaller {
      color: #bdc3c7;
      font-size: 0.45em;
      padding-bottom: 20px;
      vertical-align: super;
    }
  }

  .shadow {
    @include size(100%, 100%);
    border: $default-size / 10 solid #bdc3c7;
    border-radius: 50%;
  }

  &.style-2 {
    .label {
      background: none;
      color: #7f8c8d;

      .smaller {
        color: #bdc3c7;
      }
    }
  }

  &.progress-30 {
    @include draw-progress(30, red);
  }

  &.progress-60 {
    @include draw-progress(60, #9b59b6);
  }

  &.progress-90 {
    @include draw-progress(90, #e67e22);
  }

  &.progress-45 {
    @include draw-progress(45, #1abc9c);
  }

  &.progress-75 {
    @include draw-progress(75, #8e44ad);
  }

  &.progress-95 {
    @include draw-progress(95, #e74c3c);
  }
  &.progress-100 {
    @include draw-progress(100, #3cff00);
  }
}

.pie-wrapper--solid {
  border-radius: 50%;
  overflow: hidden;

  &:before {
    border-radius: 0 100% 100% 0 / 50%;
    content: '';
    display: block;
    height: 100%;
    margin-left: 50%;
    transform-origin: left;
  }

  .label {
    background: transparent;
  }

  &.progress-65 {
    @include draw-progress--solid(65, #e67e22, $bg-color);
  }

  &.progress-25 {
    @include draw-progress--solid(25, #9b59b6, $bg-color);
  }

  &.progress-88 {
    @include draw-progress--solid(88, #3498db, $bg-color);
  }
}
</style>
