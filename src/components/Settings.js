import * as React from "react";
import Stack from "@mui/material/Stack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import "../components/Settings.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Settings() {
  return (
    <div className="Settings">
      <div className="ButtonReturn">
        <Button href="/">
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </Button>
      </div>

      <div className="ContainerSettings">
        <div className="HeaderLogo">
          <img
            className="ImgLogo"
            src="./static/images/doggywalky.png"
            alt="logo"
          />
        </div>

        <Card className="FormSettings" variant="outlined">
          <div className="FontTitleSettings">
            <h1> Paramètres</h1>
          </div>

          <Typography>
            <div className="FontSettings">
              <p> Dark Mode </p>
              <Switch {...label} defaultChecked />
            </div>
            <div className="FontSettings">
              <p> Notifications </p>
              <Switch {...label} defaultChecked />
            </div>
          </Typography>

          <Typography>
            <div className="FontLinkSettings">
              <a className="FontLinkSettings" href="/" class="nounderline">
                Se déconnecter
              </a>

              <a className="FontLinkSettings" href="/" class="nounderline">
                Supprimer mon compte
              </a>
            </div>
          </Typography>

          <Stack direction="column" spacing={2}>
            <Button
              href="/UserProfil"
              className="ButtonSettings"
              variant="contained"
            >
              Valider
            </Button>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
