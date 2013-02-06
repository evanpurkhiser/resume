all: resume.pdf

resume.pdf: resume.md template.tex
	pandoc --template=template.tex resume.md -o resume.pdf

clean:
	rm resume.pdf
