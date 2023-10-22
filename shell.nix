{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  name = "ikram-web";
  packages = with (pkgs); [ nodejs_20 ];
}
