# Amida Content

# File to Markdown Converter

This script converts all files in the `uploads` directory to Markdown format using Pandoc. It's optimized to use Bun's `$` API for shell commands and native file handling for improved performance.

## Prerequisites

1. [Bun](https://bun.sh/) - JavaScript runtime (required for $ API and native file handling)
2. [Pandoc](https://pandoc.org/installing.html) - Document converter

## Setup

```bash
# Install dependencies
bun install

# Make sure you have pandoc installed
pandoc --version
```

## Usage

1. Place your files to convert in the `uploads` directory
2. Run the conversion script:

```bash
bun run convert
```

3. Converted files will be available in the `markdown-output` directory

## Supported File Types

Pandoc supports conversion from many formats including:

- Microsoft Word (.docx, .doc)
- HTML (.html, .htm)
- LaTeX (.tex)
- PDF (.pdf) - requires additional tools
- RTF (.rtf)
- And many more

For a complete list of supported formats, see the [Pandoc documentation](https://pandoc.org/).
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
