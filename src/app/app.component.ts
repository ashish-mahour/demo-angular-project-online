import { Component, NgZone, OnInit } from "@angular/core";
import { statesArray } from "./states";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {
  trigger,
  transition,
  style,
  state,
  animate
} from "@angular/animations";
import * as moment from "moment"

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("slideAnimation", [
      state(
        "slideX",
        style({ transform: "transformX('{{transformXValue}}' + 'px')" }),
        {
          params: { transformXValue: 0 }
        }
      ),
      transition("* => slideX", [
        animate("100ms", style({ transform: "transformX('0px')" }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  name = "Ashish";
  safeUrl: string;
  minutes: any;
  seconds: any;
  minutesZone: any;
  secondsZone: any;
  obj: string[] = statesArray;
  result: any;
  changeState: boolean = false;
  slideLeft: number = 0;
  video: HTMLVideoElement;
  transformXValue: number = 200;

  constructor(private http: HttpClient, private zone: NgZone) {}

  ngOnInit() {
    this.safeUrl = "data:application/pdf;base64,";
    this.getUTC();
    // this.setUpCamera();
    // this.startTimer((60*2));
    // this.startTimerByZone((60*2));
  }

  currentDate: Date = new Date();
  utcDate: Date = new Date();
  getUTC() {
    this.utcDate.setMinutes(
      this.utcDate.getMinutes() + this.currentDate.getTimezoneOffset()
    );
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    // const utc = new Date(new Date("2020-04-20 17:30:00").toLocaleString("en-US", { timeZone: "Asia/Calcutta" }));
    const utc = new Date("5/6/2020, 5:30:00 PM")
    // const utc = new Date("2020-05-06T12:00:00.000Z")
    const local = new Date(utc.toString());
    console.log(local.toString());
    console.log(utc.toLocaleString());
    console.log(utc.toUTCString());
    console.log(utc.toISOString());
    console.log(moment())

    // const dateByTimeZone = new Date(
    //   utc.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
    // );
    // console.log(dateByTimeZone);
    // console.log("Current Date: " + this.currentDate.toLocaleString());
    // console.log("UTC Date: " + this.utcDate.toLocaleString());
  }

  setUpCamera() {
    this.video = document.createElement("video");
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environmemt"
        },
        audio: false
      })
      .then((stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.play();
        document.body.append(this.video);
      })
      .catch(error => console.log("Error : ", error));
  }

  takePhoto() {
    const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
    canvas.height = this.video.videoHeight;
    canvas.width = this.video.videoWidth;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
    console.log(canvas.toDataURL("image/png"));
  }

  startTimer(durationInSeconds: number): any {
    let timer = setInterval(() => {
      this.minutes = Math.floor(durationInSeconds / 60);
      this.seconds = durationInSeconds % 60;

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
      if (--durationInSeconds < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  startTimerByZone(durationInSeconds: number): any {
    let timer = setInterval(() => {
      this.zone.run(() => {
        this.minutesZone = Math.floor(durationInSeconds / 60);
        this.secondsZone = durationInSeconds % 60;

        this.minutesZone =
          this.minutesZone < 10 ? "0" + this.minutesZone : this.minutesZone;
        this.secondsZone =
          this.secondsZone < 10 ? "0" + this.secondsZone : this.secondsZone;
        if (--durationInSeconds < 0) {
          clearInterval(timer);
        }
      });
    }, 1000);
  }
  onPress(event: any, element: HTMLElement) {
    element.style.border = "none";
    this.name = ", You are swiping!!";
    this.slideLeft = event.center.x;
    this.changeState = true;
  }
}
